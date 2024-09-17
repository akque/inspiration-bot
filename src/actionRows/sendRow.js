const { ActionRowBuilder } = require('discord.js')

const sendButton = require('../elements/sendButton')
const cancelButton = require('../elements/cancelButton')

const sendRow = new ActionRowBuilder().addComponents(sendButton, cancelButton)

module.exports = sendRow