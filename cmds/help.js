const ensure = require("../functions/ensure.js")
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const simpleEmbed = require("../functions/simpleEmbed.js")
const help = require('../help.json')
module.exports.run = async (bot, message, args) => {
    let cmd = args[0]
    if (!cmd) return simpleEmbed(message.channel, "Commands", `**Run "d!help <command>" for more information**\n${Object.keys(help).join("\n")}`)
    if (!Object.keys(help).includes(cmd)) return simpleEmbed(message.channel, "Wrong Arguments!", "Please use the correct arguments.")
    simpleEmbed(message.channel, `Command - ${cmd}`, `Description: ${help[cmd].description}`)

}

module.exports.help = {
    name: "help",
    alias: "commands"
}