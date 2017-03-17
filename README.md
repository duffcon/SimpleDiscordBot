# Alpha

Decided this was a good enough for an alpha.

---

## Client Pooling

A database connection will be shared among many files so one solution is to use a pool of clients rather than a single one.
A pool of clients will be placed in a separate file and exported using module.exports.

```javascript
//clientpool.js
var pg = require('pg');

var config = {
  user: 'postgres',
  database: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 50000,
};

var pool = new pg.Pool(config);
module.exports = pool;
```

In a file that needs a connection you can simply require the file

```javascript
var pool = require ('./clientpool.js');
```

An unused client can be acquired with the following code:

```javascript
pool.connect( (err, client, done) => {
    //database interaction goes here
    //client.query('...')

    //disconnent from database on error
    done(err);
});
```

## Message Event

The most complex piece of code is when the bot receives a message. If you understand this you will be able to understand the rest.

Nothing happens yet.

```javascript
bot.on('message', (message) => {


});
```

Only want to store information for real users and not bots. Personal decision to not include commands in message count.

```javascript
bot.on('message', (message) => {
    //Not send by a bot and not a command
    if(message.author.bot == false && (message.content.startsWith(prefix) == false) ){


    }
});
```
Paste the client allocation code from above inside the if statement.


```javascript
bot.on('message', (message) => {
    //Not send by a bot and not a command
    if(message.author.bot == false && (message.content.startsWith(prefix) == false) ){
        //Connected to database
        pool.connect( (err, client, done) => {


        });
    }
});
```

We now have a connection to the database so we can query it. Someone sent a message so their count will be incremented by 1.

```javascript
bot.on('message', (message) => {
    //Not send by a bot and not a command
    if(message.author.bot == false && (message.content.startsWith(prefix) == false) ){
        //Connected to database
        pool.connect( (err, client, done) => {
            //Increment users count by 1
            client.query('update users set count = count + 1 where id = $1',
            [message.author.id], (err, result) => {
                done(err);


            });
        });
    }
});
```

Well what if the user is not the in database? If they are not the query will return update 0. We will check for that to know if the user needs to be added. The user will be added with a count of 1 instead of the default 0.

```javascript
bot.on('message', (message) => {
    //Not send by a bot and not a command
    if(message.author.bot == false && (message.content.startsWith(prefix) == false) ){
        //Connected to database
        pool.connect( (err, client, done) => {
            //Increment users count by 1
            client.query('update users set count = count + 1 where id = $1',
            [message.author.id], (err, result) => {
                done(err);
                //If user not in the database add them
                if (result.rowCount == 0){
                    client.query('insert into users (id, name, count) values ($1, $2, 1)',
                    [message.author.id, message.author.username], (err, result) => {
                        done(err);
                    });
                }
            });
        });
    }
});
```


The rest of the code follows the same format. You should be able to understand the rest.
