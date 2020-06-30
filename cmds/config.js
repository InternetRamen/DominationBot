const ensure = require("../functions/ensure.js")
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const simpleEmbed = require("../functions/simpleEmbed.js")
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return simpleEmbed(message.channel, "Invalid Permissions", "You must have the permission, `Manage Server`")
    await ensure(bot, message.guild)
    let values = Object.keys(bot.serverSettings.get(config.defaultServerID))
    let setting = args[0]
    let settingsEmbed = new MessageEmbed()
        .setTitle("Settings")
        .setDescription(values.join('\n'))
        .setColor("#43f7a3")
    if (!setting) return message.channel.send({embed: settingsEmbed})
    console.log(values)
    console.log(setting)
    if (!values.includes(setting)) return simpleEmbed(message.channel, "Wrong Arguments!", "Please use the correct arguments.")
    if (setting === "prefix") {
        let prefix = args[1]
        if (!prefix) return simpleEmbed(message.channel, "Wrong Arguments!", "Please use the correct arguments.")
        bot.serverSettings.set(message.guild.id, prefix, "prefix")
        simpleEmbed(message.channel, "Success!", `Set ${setting} to ${prefix}.`)
    } else {

    let boolean = args[1]
    let extraOptions = args[2]
    if (!boolean) return simpleEmbed(message.channel, "Wrong Arguments!", "Please use the correct arguments.")
    let extraNeeds = config.extraNeeds
    if (extraNeeds.includes(setting)) {
        
        let before = bot.serverSettings.get(message.guild.id)
        let specific = before[setting]
        specific["extra"] = extraOptions
        specific["value"] = boolean
        bot.serverSettings.set(message.guild.id, specific, setting)
        simpleEmbed(message.channel, "Success!", `Set ${setting} to ${boolean} with ${extraOptions} as an option.`)

    } else {
        bot.serverSettings.set(message.guild.id, boolean, setting)
        simpleEmbed(message.channel, "Success!", `Set ${setting} to ${boolean}`)

    }


    }



}

module.exports.help = {
    name: "config",
    alias: "config"
}