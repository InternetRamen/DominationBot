const ensure = require("../functions/ensure.js")
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const simpleEmbed = require("../functions/simpleEmbed.js")
const help = require('../help.json')
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return simpleEmbed(message.channel, "Invalid Permissions", "You must have the permission, `Manage Server`")
    await ensure(bot, message.guild)
    let gameObj = bot.games.observe(message.guild.id)
    if (!gameObj.setup) return simpleEmbed(message.channel, "Setup", "You didn't set up the bot with `d!setup`")
    if (gameObj.inGame === false) return simpleEmbed(message.channel, "Not In Game", "This server is not in a game. Use `d!start` to start one.")
    simpleEmbed(bot.channels.cache.get(gameObj.channelID), "Domination END", "The event has ended... Any message sent here will no longer be counted toward points.")
    gameObj.inGame = false
    let place = 0
    simpleEmbed(bot.channels.cache.get(gameObj.channelID), "Domination END", "Caculation of points will now begin...")
        let array = Object.values(gameObj.teams)
        let filtered = array.filter(val => val.available === true)
        let sorted = filtered.sort((a, b) => b.megaPoints - a.megaPoints);
  
        let embed = new MessageEmbed()
            .setTitle("Domination END")
            .setColor("#43f7a3")
            let description = ""
        for (let data of sorted) {
            place = place+1
            description += `**${place}** ${data.name} - ${data.megaPoints}\n`
            
        }
        embed.setDescription(description)
        bot.channels.cache.get(gameObj.channelID).send(embed)
        Object.keys(gameObj.teams).forEach(val => {
            gameObj.teams[val].hiddenPoints = 0
            gameObj.teams[val].megaPoints = 0
        })
    simpleEmbed(message.channel, "Domination END", "You successfully ended the event!")
    
}

module.exports.help = {
    name: "end",
    alias: "end"
}