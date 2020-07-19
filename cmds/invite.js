const embed = require('../functions/simpleEmbed')
module.exports.run = (bot, message, args) => {
    embed(message.channel, "Links", "**Invite Link:**\nhttps://discord.com/oauth2/authorize?client_id=728256352836649100&permissions=201714800&redirect_uri=https://discord.gg/GsNSAHA&response_type=code&scope=bot%20guilds.join\n**Support Server:**\nhttps://discord.gg/GsNSAHA")


}

module.exports.help = {
    name: "invite",
    alias: "i"
}