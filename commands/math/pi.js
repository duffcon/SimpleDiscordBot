const commando = require('discord.js-commando');

module.exports = class TestCommand extends commando.Command {

    constructor(client){
        super(client, {
            name:'pi',
            group: 'math',
            memberName:'picommand',
            description:'returns pi'
        });
    }

    async run(message){
        message.reply("3.14159265359");

    }
}
