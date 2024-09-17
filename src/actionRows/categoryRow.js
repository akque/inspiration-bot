const { ActionRowBuilder } = require('discord.js')

const selectMenu = require('../selectMenu')

const categoryRow = new ActionRowBuilder().addComponents(selectMenu)

module.exports = categoryRow