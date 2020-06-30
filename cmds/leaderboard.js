const ensure = require("../functions/ensure.js")
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const simpleEmbed = require("../functions/simpleEmbed.js")
const help = require('../help.json')
module.exports.run = async (bot, message, args) => {
     await ensure(bot, message.guild)
    let gameObj = bot.games.observe(message.guild.id)
    if (!gameObj.setup) return simpleEmbed(message.channel, "Setup", "You didn't set up the bot with `d!setup`")
    if (gameObj.inGame === false) return simpleEmbed(message.channel, "Not In Game", "This server is not in a game. Use `d!start` to start one.")

    let place = 0

        let array = Object.values(gameObj.teams)
        let filtered = array.filter(val => val.available === true)
        let sorted = filtered.sort((a, b) => b.megaPoints - a.megaPoints);
  
        let embed = new MessageEmbed()
            .setTitle("Domination Leaderboard")
            .setColor("#43f7a3")
            let description = ""
        for (let data of sorted) {
            place = place+1
            description += `**${place}** ${data.name} - ${data.megaPoints}\n   Messages: ${data.hiddenPoints}\n`
            
        }
        embed.setDescription(description)
        message.channel.send(embed)
    
}

module.exports.help = {
    name: "leaderboard",
    alias: "top"
}