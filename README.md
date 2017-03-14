# Obedience

Your bot can speak, but does it listen? This is how to command your bot.

---

This is where discord.js-commando will be more helpful than simply using discord.js. Rather than cluttering our index.js file with various commands, we can organize them one file at a time.

We are going to store commands in a command folder, so make one.
```bash
mkdir commands
```

For better organization we can group the commands into folders. So in this example we will have math commands in the math folder.

```bash
mkdir commands/math
```
Slightly different from the previous section is that we have specified the prefix these commands will use. I decided to use '!'.

```javascript
const commando = require('discord.js-commando');

const bot = new commando.Client({
    commandPrefix: '!'
});
```


In the commands/math folder create pi.js. This will be a simple command that will send the value of pi.

```javascript
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
```

back in index.js we will register the commands.
```javascript
bot.registry.registerGroup('math', 'math');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands')
```

Run your bot with:

```bash
node .
```

If you go to your discord server and type "!pi" your bot should tell you the value of pi.

A more complicated command will be in add.js which will take arguments and tell you the sum of the values.
```javascript
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
```
If you type "!add 1 2 3 4" your bot should respond with the "10".

Sending "!help" will direct message you all the commands that the bot will listen to.


## References

https://discord.js.org/#/docs/commando/master/class/Command?scrollTo=run
