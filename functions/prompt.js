const simpleEmbed = require('./simpleEmbed.js')


module.exports = async (message, title, prompt) => {
    
    const filter = (response) => response.author.id === message.author.id;
    simpleEmbed(message.channel, title, prompt)

    return message.channel.awaitMessages(filter, { max: 1, time: 180000, errors: ['time'] })
        .then(collected => {

            const content = collected.first().content;
            if (content.toLowerCase() === "cancel") throw "Canceled"
            return content;
        })
        .catch(_ => {
            console.log(_)
            return simpleEmbed(message.channel, "Setup", "You didn't send a message in time or canceled the command.")
        });
};
