const { MessageEmbed } = require('discord.js')
module.exports = (channel, title, description) => {
    let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor("#43f7a3")
    channel.send({embed: embed})
}