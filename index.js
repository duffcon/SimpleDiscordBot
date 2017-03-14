const commando = require('discord.js-commando');
const bot = new commando.Client();

//Token from discord website
bot.login('MjkxMTA5NjgyNjA3ODE2NzA2.C6ksrw.WpEcreIwJcaI5dMdk5_KPVRu59k');

bot.on("message", (message) => {
    if(message.content.startsWith("hello")){
        message.channel.sendMessage("world");
    }
});
