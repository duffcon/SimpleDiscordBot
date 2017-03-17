const commando = require('discord.js-commando');
var pool = require ('../../clientpool.js');

module.exports = class TestCommand extends commando.Command {

    constructor(client){
        super(client, {
            name:'chatty',
            group: 'count',
            memberName:'chattycommand',
            description:'Lists (up to) X most talkative people'
        });
    }

    //List users with highest amount of messages sent
    //DOES account for ties
    //More complicated than it needs to be
    async run(message){
        const places = 5;
        var text = '\0\n\n**The most chatty:**\n';
        var num = 0;
        var prev = '0';
        pool.connect( (err, client, done) => {
            //Receive users by descending count order
            var myquery = client.query('select (name, count) from  users order by count desc');
            //For every user
            myquery.on('row', (row,result) => {
                //First row, set initial prev value
                if (num == 0) {
                    var data = row.row.replace(/[{()}]/g, '').split(',');
                    text = text + '1' + '. ' + data[0] + ': ' + data[1] + '\n';
                    prev = data[1];
                    num = 1;
                }
                //Go until number of places specified
                else if(num > 0 && num < places+1) {
                    //Query returns value like: (john, 34)
                    //Strips brackets and comma
                    var data = row.row.replace(/[{()}]/g, '').split(',');
                    //Accounts for ties so only increment is the new count is not equal to prev
                    if(prev != data[1]) { num += 1;}
                    if (num != places+1) {
                        text = text + num.toString() + '. ' + data[0] + ': ' + data[1] + '\n';
                        prev = data[1];
                    }
                }
            });

            myquery.on('end', (result) => {
                 message.channel.sendMessage(text);
            })

        });
    }


}
