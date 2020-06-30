module.exports.run = (bot, message, args) => {
    message.channel.send("Pinging...").then(m => {
        m.edit(`Ping: ${m.createdTimestamp - message.createdTimestamp} ms\nHeartbeat: ${bot.ws.ping}`)
    })


}

module.exports.help = {
    name: "ping",
    alias: "p"
}