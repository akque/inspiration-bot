const { ActionRowBuilder } = require('discord.js')

const sendButton = require('../buttons/sendButton')
const cancelButton = require('../buttons/cancelButton')

const sendRow = new ActionRowBuilder().addComponents(sendButton, cancelButton)

module.exports = sendRow