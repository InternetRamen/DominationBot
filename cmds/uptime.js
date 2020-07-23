
const embed = require('../functions/simpleEmbed')

module.exports.run = (bot, message, args) => {
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    embed(message.channel, "Uptime", `The bot has been online for ${days} D, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`)
}
module.exports.help = {
    name: "uptime",
    alias: "upt"
}