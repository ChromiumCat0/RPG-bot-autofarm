const Discord = require('discord.js');
const client = new Discord.Client();
let { token, minDelay, maxDelay, logChannel } = require('./config.json');

function logToChannel(message) {
    logChannel.send(message);
}

function sendCatch(message) {
    message.channel.send('catch');
    console.log(`Caught in ${message.channel.name}`);
    logToChannel(`Caught in ${message.channel.name}`);
}

function sendFish(message) {
    message.channel.send('fish');
    console.log(`Fished in ${message.channel.name}`);
    logToChannel(`Fished in ${message.channel.name}`);
}

function sendChop(message) {
    message.channel.send('chop');
    console.log(`Chopped in ${message.channel.name}`);
    logToChannel(`Chopped in ${message.channel.name}`);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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


    const delay = getRandomInt(minDelay, maxDelay);

    if (message.content.startsWith('!debug')) {
        const args = message.content.replace('!debug ', '').split(' ');
        switch (args[0]) {
            case 'catch':
                setTimeout(sendCatch, delay, message);
                break;
            case 'fish':
                setTimeout(sendFish, delay, message);
                break;
            case 'chop':
                setTimeout(sendChop, delay, message);
                break;
        }
    }

    if (message.author === client.user && message.content === 'rpg hunt') {
        setTimeout(() => message.channel.send('rpg heal'), 5000);
    }

    if (message.author.id !== '555955826880413696') return;
    if (message.embeds[0] && message.embeds[0].fields[0]) {
        const fieldName = message.embeds[0].fields[0].name;
        const eventType = fieldName ? (fieldName.includes('AN EPIC TREE HAS JUST GROWN') ? 'chop' : fieldName.includes('A MEGALODON HAS SPAWNED IN THE RIVER') ? 'fish' : fieldName.includes('IT\'S RAINING COINS') ? 'catch' : null) : null;
        switch (eventType) {
            case 'catch':
                setTimeout(sendCatch, delay, message)
                break
            case 'fish':
                setTimeout(sendFish, delay, message)
                break
            case 'chop':
                setTimeout(sendChop, delay, message)
                break
        }
    }
});
