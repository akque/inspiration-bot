const { ButtonBuilder, ButtonStyle } = require('discord.js')

const sendButton = new ButtonBuilder()
  .setStyle(ButtonStyle.Secondary)
  .setLabel('Send')
  .setCustomId('send')
  .setEmoji('✅')

module.exports = sendButton