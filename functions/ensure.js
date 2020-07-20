module.exports = async (bot, server) => {
    bot.serverSettings.ensure(server.id, {
        prefix: "d!"
    })
    bot.games.ensure(server.id, {
        numberOfTeams: 2,
        setup: false,
        inGame: false,
        InTheLead: null,
        teams: {
            team1: {
                available: true,
                memberIDs: [],
                hiddenPoints: 0,
                megaPoints: 0,
                name: "",
                id: "",
                teamNumber: 1,
                channelName: ""
            },
            team2: {
                available: true,
                memberIDs: [],
                hiddenPoints: 0,
                megaPoints: 0,
                name: "",
                id: "",
                teamNumber: 2,
                channelName: ""
            },
            team3: {
                available: false,
                memberIDs: [],
                hiddenPoints: 0,
                megaPoints: 0,
                name: "",
                id: "",
                teamNumber: 3,
                channelName: ""
            },
            team4: {
                available: false,
                memberIDs: [],
                hiddenPoints: 0,
                megaPoints: 0,
                name: "",
                id: "",
                teamNumber: 4,
                channelName: ""
            }

        },
        channelID: 0,
        infoChannelID: 0,
        guildID: 0,
        premium: false,
    })
}