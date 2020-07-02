const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")
const Enmap = require('enmap')
const clock = require("./functions/clock.js")
bot.cmds = new Discord.Collection();
bot.alias = new Discord.Collection();
bot.serverSettings = new Enmap({name: "serverSetup", ensureProps: true})
bot.games = new Enmap({name: "games", ensureProps: true})


fs.readdir('./cmds/', (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Err: Could not find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        let prop = require(`./cmds/${f}`);
        console.log(`${f} loaded!`);
        bot.cmds.set(prop.help.name, prop);
        bot.alias.set(prop.help.alias, prop)
    });
})



bot.on('ready', () => {
    console.log("3, 2, 1 Lift Off!")
    clock(bot)
});

bot.on('message', message => {
    

    if (message.channel.type === "dm") return;
    if (message.author.bot) return;

    let prefix = bot.serverSettings.get(message.guild.id)
    if (!prefix) prefix = "d!"
    else prefix = prefix.prefix
    if (prefix === undefined) prefix = "d!"
    if (!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd;
    let args;
    if (messageArray[0] === prefix) {
        cmd = messageArray[1]
        args = messageArray.slice(2)
    } else {
        cmd = messageArray[0].slice(prefix.length)
        args = messageArray.slice(1);
    }

    let cmdFile = bot.cmds.get(cmd);

    let alias = bot.alias.get(cmd)
    if (cmdFile) cmdFile.run(bot, message, args);
    else if (alias) alias.run(bot, message, args)



});

bot.on('message', message => {
    

    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    let obj = bot.games.get(message.guild.id)
    if (!obj) return;
    if (obj.setup === false) return;
    if (obj.inGame === false) return;
    if (message.channel.id !== obj.channelID) return;
    let team1Members = obj.teams.team1.memberIDs
    let team2Members = obj.teams.team2.memberIDs
    let participants = team1Members.concat(team2Members)
    if (obj.teams.team3.available === true) {
        let team3 = obj.teams.team3.memberIDs
        participants = participants.concat(team3Members)
    }
    if (obj.teams.team4.available === true) {
        let team4 = obj.teams.team4.memberIDs
        participants = participants.concat(team4Members)
    }
    if (!participants.includes(message.author.id)) return;
    let observeable = bot.games.observe(message.guild.id)
    let correctTeam = Object.values(obj.teams).find(val => val.memberIDs.includes(message.author.id))
    observeable.teams[`team${correctTeam.teamNumber}`].hiddenPoints += 1
});

bot.on("guildCreate", guild => {
    if (!guild.available) return;
    let channels = guild.channels.cache
    if (!channels) return;
    let textChannels = channels.filter(val => val.type === "text")
    let validChannel = textChannels.map(val => val.id)
    bot.channels.cache.get(validChannel[0]).send("Thank you for inviting Domination Bot. Please use `d!setup` and `d!about` to begin.")
    bot.channels.cache.get(config.supportServerID).send(`${guild.owner} invited the bot to ${guild.name}`)



})

bot.on("guildRemove", guild => {
    bot.channels.cache.get(config.supportServerID).send(`${guild.owner} removed the bot from ${guild.name}`)



})




bot.login(config.token);