# Postgres + Javascript

In the last section we interacted with the database with the command line, how do we do that with javascript?

---

## Client

Create a new client named 'db' by passing in an object.

```javascript
var pg = require('pg');

var db = new pg.Client({
  user: 'postgres',
  password: 'admin',
  database: 'postgres',
  host: 'localhost',
  port: 5432
});
```
Or a connection string.

```javascript
var pg = require('pg');

//var connectionString = 'postgres://user:password@host:port/database';
var connectionString = 'postgres://postgres:admin@localhost:5432/postgres';
var db = new pg.Client(connectionString)
```

## Connect

Simplest.

```javascript
db.connect();
```
Provide callback function.

```javascript
db.connect( ()=> {
    console.log('I have connected');
});
```
Handle errors.

```javascript
db.connect((err)=> {
    if (err){throw err}
    console.log('I have connected');
});
```

## Query

No callback function.

```javascript
db.query('select * from users');
```

Callback function includes a result object which contains command, rowcount, rows, etc.

```javascript
db.query('select * from users', (err, result) => {
    console.log(result);
});
```

result.rows is an array of everything returned by the query.

```javascript
db.query('select * from users', (err, result) => {
    if(err) {throw err}
    console.log(result.rowCount + ' rows were returned\n');
    console.log(result.rows);
});
```

---

Instead of using a callback function we will use the QUERY object returned by the db.query function. This object has two main events: row and end. Row occurs once for every row that is returned. End occurs when all rows have been returned.

```javascript
var myquery = db.query('select * from users');

myquery.on('row', (row, result) => {
    console.log('id: ' + row.id);
    result.addRow(row);
});

myquery.on('end', (result) => {
    console.log('all done mate');
});
```
You can also include an error event if you desire.

```javascript

myquery.on('error', () => {
    console.log('there was error');
})
```

---

If your queries will vary slightly you can parameterize them.

```javascript
db.query({
  text: 'SELECT * FROM users where id = $1',
  values: ['3']
}, (err, result) => {
  console.log('count: ' + result.rows[0].count)
});
```

```javascript
var ids = ['2', '3'];

db.query({
  text: 'SELECT * FROM users where id = $1 or id = $2',
  values: ids
}, function(err, result) {
    if(err){throw err}
    console.log(result.rows)
});
```

Type conversion.

```javascript
db.query('select * from users where id = 2::text', (err, result) => {
    console.log(result.rows);
});
```

Spans multiple lines.

```javascript
db.query('select * \
          from users \
          order by count desc',
    (err, result) => {
        console.log(result.rows);
});
```

## Disconnect

You can immeditely terminate the connection.

```javascript
db.end();
```

Or end the connection once all the query have completed.

```javascript
db.on('drain', db.end.bind(db));
```


## References
https://github.com/brianc/node-postgres/wiki/Client

https://www.tutorialspoint.com/sql/sql-order-by.htm
