require('dotenv').config()
const { onReady, client, commandsHandler, newMemberHandler, newWorkHandler } = require('./events/client')

client.on('ready', onReady)

client.on('interactionCreate', commandsHandler)

client.on('guildMemberAdd', newMemberHandler)

client.on('messageCreate', newWorkHandler)

client.login(process.env.TOKEN)