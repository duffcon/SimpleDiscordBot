
const commando = require('discord.js-commando');
var pool = require ('./clientpool.js');

prefix = '!'

//Connect to discord server
const bot = new commando.Client({
    commandPrefix: prefix,
    owner:['YourID']
});

//Register Commands
bot.registry.registerGroup('count', 'count');
bot.registry.registerGroup('math', 'math');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands')
bot.login('MjkxMTA5NjgyNjA3ODE2NzA2.C6ksrw.WpEcreIwJcaI5dMdk5_KPVRu59k');



//Bot loads up
bot.on('ready', () => {
    console.log('The bot is ready to go');
    pool.connect( (err, client, done) => {
            client.query('create table if not exists users( \
                id text primary key, \
                name text, \
                count integer default 0)', (err, result) => {
                    //disconnent from database on error
                    done(err);
            });
    });
});

//When a message is sent
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
                        console.log(result.rowCount);
                    });
                }
            });
        });
    }
});

//User changes nickname
bot.on('guildMemberUpdate', (oldguy, newguy) => {
    pool.connect( (err, client, done) => {
        //Update display name to new nickname
        client.query('update users set name = $1 where id = $2',
        [newguy.displayName, newguy.user.id], (err, result) => {
            done(err);

        });
    });





});
