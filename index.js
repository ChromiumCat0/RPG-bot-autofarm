const Discord = require('discord.js')
const client = new Discord.Client()
let { token, delay, logChannel } = require('./config.json')

function logToChannel(message) {
    logChannel.send(message)
}

client.login(token);

client.on('ready', () => {
    console.log('ready')
    logChannel = client.channels.get(logChannel)
})

client.on('disconnect', () => {
    console.log('disconnect')
})

client.on('message', message => {

    if (!message.guild) return;
    if ((message.mentions.users.first() && message.mentions.users.first().id == client.user.id) && message.author.id) {
        console.log(`Got menitoned by ${message.author.username} (${message.author.id}) in ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id})`)
        logToChannel(`Got menitoned by ${message.author.username} (${message.author.id}) in ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id})`)
    }

    function sendCatch(channel) {
        message.channel.send('catch')
        console.log(`Caught in ${channel.name}`)
        logToChannel(`Caught in ${channel.name}`)
    }

    function sendFish(channel) {
        message.channel.send('fish')
        console.log(`Fished in ${channel.name}`)
        logToChannel(`Fished in ${channel.name}`)
    }

    function sendChop(channel) {
        message.channel.send('chop')
        console.log(`Chopped in ${channel.name}`)
        logToChannel(`Chopped in ${channel.name}`)
    }

    if (message.content.startsWith('!debug')) {
        const args = message.content.replace('!debug ', '').split(' ')
        switch (args[0]) {
            case 'catch':
                setTimeout(sendCatch, delay, message.channel)
                break
            case 'fish':
                setTimeout(sendFish, delay, message.channel)
                break
            case 'chop':
                setTimeout(sendChop, delay, message.channel)
                break
        }
    }

    if (message.author.id != '555955826880413696') return
    switch (message.content) {
        case 'Summoning the coin rain...':
            setTimeout(sendCatch, delay, message.channel)
            break
        case 'Placing the ultra bait...':
            setTimeout(sendFish, delay, message.channel)
            break
        case 'Planting the epic seed...':
            setTimeout(sendChop, delay, message.channel)
            break
    }
})
