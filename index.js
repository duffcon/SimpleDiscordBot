var pg = require('pg');

//var connectionString = 'postgres://user:password@host:port/database';
var connectionString = 'postgres://postgres:admin@localhost:5432/postgres';
var db = new pg.Client(connectionString)



//Disconnect after all queries
db.on('drain', db.end.bind(db));

db.connect(()=>{
    console.log('connected to database');
});

//Create Table
db.query('create table if not exists users( \
    id text primary key, \
    count integer default 0)');

//Insert users into database
db.query("insert into users (id, count) \
          values ('1', 0), ('2', 15), ('3', 12), ('4', 2)");

//Table before update
db.query('select * from users order by count desc', (err, result) => {
    if(err){throw err}
    console.log(result.rows);
});

//Update
db.query('update users set count = 3 where id > 1::text', (err, result) => {
    if(err){throw err}
    console.log(result.command + ' ' + result.rowCount);
});

//Table after update
db.query('select * from users order by count desc', (err, result) => {
    if(err){throw err}
    console.log(result.rows);
});

//drop table
db.query('drop table if exists users', (err, result) => {
    if(err){throw err}
    console.log(result.command);
});
