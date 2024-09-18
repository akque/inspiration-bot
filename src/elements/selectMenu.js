const categories = require('../categories')
const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')

const selectMenu = new StringSelectMenuBuilder()
  .setCustomId('select')
  .setPlaceholder('Select a category')
  .setMinValues(0)
  .setMaxValues(categories.length)
  .addOptions(
    categories.map((category) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(category.label)
        .setDescription(category.description)
        .setValue(category.value)
    )
  )

module.exports = selectMenu