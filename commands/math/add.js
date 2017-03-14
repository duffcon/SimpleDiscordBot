const commando = require('discord.js-commando');

module.exports = class TestCommand extends commando.Command {

    constructor(client){
        super(client, {
            name:'add',
            group: 'math',
            memberName:'addcommand',
            description:'returns sum of the arguments.\tExample: !add 1 2.6 5',
      			args: [{
        				key: 'add_key',
        				label: 'number',
        				prompt: 'Enter numbers to add together:\n',
        				type: 'float',
        				infinite: true
        			}]
        });
    }

    async run(message, args){
        var sum = 0;
        var equation = args.add_key.join(' + ');
        console.log(equation);
        for (var num of args.add_key){
            sum += num;
        }
        message.reply(equation + " = " + sum);

    }
}
