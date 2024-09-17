const { ActionRowBuilder } = require('discord.js')

const selectMenu = require('../elements/selectMenu')

const categoryRow = new ActionRowBuilder().addComponents(selectMenu)

module.exports = categoryRow