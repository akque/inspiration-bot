const { ButtonBuilder, ButtonStyle } = require('discord.js')

const cancelButton = new ButtonBuilder()
  .setStyle(ButtonStyle.Secondary)
  .setLabel('Cancel')
  .setCustomId('cancel')
  .setEmoji('❌')

module.exports = cancelButton