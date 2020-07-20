const ensure = require("../functions/ensure.js")
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const simpleEmbed = require("../functions/simpleEmbed.js")
const prompt = require('../functions/prompt.js')
const teamPrompt = require("../functions/teamPrompt")

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return simpleEmbed(message.channel, "Invalid Permissions", "You must have the permission, `Manage Server`")
    await ensure(bot, message.guild)
    if (bot.games.get(message.guild.id).inGame === true) return simpleEmbed(message.channel, "Setup", "You have to end the current game before editing it!")
    //channel
    let channelPrompt = await prompt(message, "Setup", "What channel do you want the event to be held in?")
    let channelID = /<#(\d+)>/.exec(channelPrompt)[1];
    if (!channelID) return simpleEmbed(message.channel, "Setup", "Please mention a channel.")
    let channel = message.guild.channels.cache.get(channelID)
    if (!channel) return simpleEmbed(message.channel, "Setup", "Please mention a valid channel.")
    //infochannel
    let infoPrompt = await prompt(message, "Setup", "What channel do you want me to send info to?")
    let infoChannelID = /<#(\d+)>/.exec(infoPrompt)[1];
    if (!infoChannelID) return simpleEmbed(message.channel, "Setup", "Please mention a channel.")
    let infoChannel = message.guild.channels.cache.get(infoChannelID)
    if (!infoChannel) return simpleEmbed(message.channel, "Setup", "Please mention a valid channel.")
    //teams
    let numberPrompt = await prompt(message, "Setup", "How many teams do you want in the event? Min 2, Max 4")
    let numberOfTeams = parseInt(numberPrompt)
    if (!numberOfTeams) return simpleEmbed(message.channel, "Setup", "Please send an actual number.")
    if (!numberOfTeams >= 2 && !numberOfTeams <= 4) return simpleEmbed(message.channel, "Setup", "Please send a number between 2 and 4")
    let teamArray = []
    let premium = bot.games.get(message.guild.id)

    let team1 = await teamPrompt(bot, message, "1")
    if (typeof team1 !== "object") return;
    teamArray.push(team1)
    let team2 = await teamPrompt(bot, message, "2")
    if (typeof team2 !== "object") return;
    teamArray.push(team2)
    if (numberOfTeams > 2 && premium.premium === false) return simpleEmbed(message.channel, "Error", "You must donate to access beta features.")
    if (numberOfTeams > 2) {
        let team3 = await teamPrompt(bot, message, "3")
        if (typeof team3 !== "object") return;
        teamArray.push(team3)
    }  
    if (numberOfTeams > 3) {
        let team4 = await teamPrompt(bot, message, "4")
        if (typeof team4 !== "object") return;
        teamArray.push(team4)
    }
    let obj = bot.games.observe(message.guild.id)
    for (let i = 0;i < numberOfTeams;i++){
        obj.teams[`team${i + 1}`] = teamArray[i]
    }
    obj.numberOfTeams = numberOfTeams
    obj.infoChannelID = infoChannel.id
    obj.channelID = channel.id
    obj.setup = true
    obj.guildID = message.guild.id

    simpleEmbed(message.channel, "Setup", "Setup completion! Use d!start to start your event!")
    console.log(obj)
}

module.exports.help = {
    name: "setup",
    alias: "setup"
}