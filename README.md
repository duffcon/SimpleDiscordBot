# First Words

Getting your bot to speak. Will respond to "hello" with "world".

---

We will now be using the packages we downloaded earlier. Clear out your index.js file then add:
```javascript
const commando = require('discord.js-commando');
const bot = new commando.Client();

//Token from discord website
bot.login('MjkxMTA5NjgyNjA3ODE2NzA2.C6ksrw.WpEcreIwJcaI5dMdk5_KPVRu59k');

bot.on("message", (message) => {
    if(message.content.startsWith("hello")){
        message.channel.sendMessage("world");
    }
});
```

Go to terminal and type:

```bash
node .
```

Go to your discord server and type "hello".

Your bot should say "world". They grow up so fast.


## References
https://discord.js.org/#/docs/main/stable/class/Client

https://discord.js.org/#/docs/main/stable/class/Message
