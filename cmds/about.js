
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const simpleEmbed = require("../functions/simpleEmbed.js")
module.exports.run = async (bot, message, args) => {
   
    simpleEmbed(message.channel, `About`, config.about)

}

module.exports.help = {
    name: "about",
    alias: "about"
}