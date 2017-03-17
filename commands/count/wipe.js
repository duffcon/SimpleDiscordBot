const commando = require('discord.js-commando');
var pool = require ('../../clientpool.js');

module.exports = class TestCommand extends commando.Command {

    constructor(client){
        super(client, {
            name:'wipe',
            group: 'count',
            memberName:'wipecommand',
            description:'Resets all counts to 0.'
        });
    }

    //Only let certain people clear the database
    //owner set when bot was created
    hasPermission(message) {
		return this.client.isOwner(message.author);
	}


    async run(message){
            pool.connect( (err, client, done) => {
            client.query('update users set count = 0', (err, result) => {
                done(err);
                message.message.reply('All clean!', {file:'img/clean.jpg',});
            });
        });
    }


}
