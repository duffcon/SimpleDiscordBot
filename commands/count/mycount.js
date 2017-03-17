const commando = require('discord.js-commando');
var pool = require ('../../clientpool.js');

module.exports = class TestCommand extends commando.Command {

    constructor(client){
        super(client, {
            name:'mycount',
            group: 'count',
            memberName:'mycountcommand',
            description:'Tells a user their personal message count.'
        });
    }

    async run(message){

        pool.connect( (err, client, done) => {
            client.query('select count from  users where id = $1',
            [message.message.author.id], (err, result) => {
                done(err);
                //Edge case if user has not sent any messages before
                if(result.rowCount == 0)
                {
                    message.reply('Speak Up!');
                }
                else {
                    message.reply(result.rows[0].count);
                }

            });
        });
    }


}
