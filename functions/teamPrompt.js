const prompt = require("./prompt.js")
const simpleEmbed = require('./simpleEmbed')



module.exports = async (bot, message, number) => {
    let finalOutput = {
        available: true,
        memberIDs: [],
        hiddenPoints: 0,
        megaPoints: 0,
        name: "",
        id: "",
        teamNumber: 0,
        channelName: ""
    }
    finalOutput["available"] = true
    let name = await prompt(message, "Setup", `What do you want to name Team ${number}?`)
    if (name.length > 20) return simpleEmbed(message.channel, "Setup", "Please use a name thats less than 20 characters.")
    if (name.indexOf("-") !== -1) return simpleEmbed(message.channel, "Setup", "Team names can not contain `-`.")
    if (Object.values(bot.games.get(message.guild.id).teams).map(val => val.name.toLowerCase()).includes(name)) return simpleEmbed(message.channel, "Setup", "Team names can not be the same.")
    finalOutput["name"] = name
    let id = `${message.guild.id}-${name.toLowerCase().split(" ").join("+")}`
    finalOutput["id"] = id
    finalOutput["channelName"] = `${name.toLowerCase().split(" ").join("-")}`
    let teamMembers = await prompt(message, "Setup", `Send a list of members on Team ${number}. Format: \`username#discrimiator <newline>\``)
    let teamArray = teamMembers.split("\n")

        if (!teamArray.every(val => message.guild.members.cache.find(v => val === v.user.tag))) return simpleEmbed(message.channel, "Setup", `A user isn't in this server.`)
        let idArray = teamArray.map(val => message.guild.members.cache.find(v => val === v.user.tag).id)
        finalOutput["memberIDs"] = idArray
        finalOutput["teamNumber"] = parseInt(number)
    
  
    return finalOutput

}