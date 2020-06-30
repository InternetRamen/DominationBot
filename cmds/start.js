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
    if (gameObj.inGame) return simpleEmbed(message.channel, "In Game", "This server is already in game. Use `d!end` to end the game.")
    simpleEmbed(bot.channels.cache.get(gameObj.infoChannelID), "Domination START", config.about)
    simpleEmbed(bot.channels.cache.get(gameObj.channelID), "Domination START", "The event has started...")
    gameObj.inGame = true
    simpleEmbed(message.channel, "Domination START", "You successfully started the event!")
    
}

module.exports.help = {
    name: "start",
    alias: "start"
}