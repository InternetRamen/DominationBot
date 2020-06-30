const { Channel } = require("discord.js")

module.exports = (bot) => {
    setInterval(function() {
    bot.games.forEach(obj => {
            if (!obj) return;

 
            if (obj.inGame === false) return;
            if (obj.setup === false) return;
            console.log("5m has passed for a guild")
            let array = Object.values(obj.teams)
            let filtered = array.filter(val => val.available === true)
            let sorted = filtered.sort((a, b) => b.hiddenPoints - a.hiddenPoints);
            let winner = sorted[0]
            let channel = bot.channels.cache.get(obj.channelID)
            let observe = bot.games.observe(obj.guildID)
            if (winner.hiddenPoints === 0) {
                if (channel.name !== "unowned") channel.setName("unowned")
            } else {
                
                
                if (!observe) return;
                observe.teams[`team${winner.teamNumber}`].megaPoints += 1
                if (channel.name !== winner.channelName) channel.setName(winner.channelName)
            }
            Object.keys(obj.teams).forEach(val => {
                observe.teams[val].hiddenPoints = 0
            })




    })
}, 300000)
}