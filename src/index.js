require('dotenv').config()
const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
})

client.on('ready', (c) => {
  console.log(`${c.user.tag} is ready`)
})

client.on('interactionCreate', (i) => {
  if (i.isCommand('ping')) {
    return i.reply('Pong!')
  }
})

client.on('guildMemberAdd', (m) => {
  return m.send(`<@${m.id}> Welcome to inspiration! To send a work read pinned message in <#1282413382372425748>`)
})

const categories = [
  {
    label: 'gameplay',
    id: '968857527372611594',
    description: 'send to gameplay',
    value: 'gameplay'
  },
  {
    label: 'art-inspire',
    id: '1066648380811526145',
    description: 'send to art-inspire',
    value: 'art-inspire'
  },
  {
    label: 'design',
    id: '968857360523198494',
    description: 'send to design',
    value: 'design'
  },
  {
    label: 'modern',
    id: '968857326964572210',
    description: 'send to modern',
    value: 'modern'
  },
  {
    label: 'art',
    id: '968859084075970611',
    description: 'send to art',
    value: 'art'
  },
  {
    label: 'neo-design', 
    id: '968884547242590228',
    description: 'send to neo-design',
    value: 'neo-design'
  },
  {
    label: 'effect',
    id: '1027971116511281264',
    description: 'send to effect',
    value: 'effect'
  },
  {
    label: 'other',
    id: '968880591049228299',
    description: 'send to other',
    value: 'other'
  }
]

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

const categoryRow = new ActionRowBuilder().addComponents(selectMenu)

const sendButton = new ButtonBuilder()
  .setStyle(ButtonStyle.Secondary)
  .setLabel('Send')
  .setCustomId('send')
  .setEmoji('✅')

const cancelButton = new ButtonBuilder()
  .setStyle(ButtonStyle.Secondary)
  .setLabel('Cancel')
  .setCustomId('cancel')
  .setEmoji('❌')

const sendRow = new ActionRowBuilder().addComponents(sendButton, cancelButton)

client.on('messageCreate', async (msg) => {

  if (msg.author.bot) return

  if (msg.channelId != '1282413382372425748') return

  const attachment = msg.attachments ? msg.attachments.first(): null

  console.log('pre-sort')

  client.channels.cache.get('969572233909506148').send(`new work in <#1282342934804697169> from ${msg.author.username}. ||<@&1028279847031668856> <@&983680839885946920>||`)

  if (attachment != undefined) {

    if (msg.content == '') {

      let attachments = msg.attachments
      for (let file of attachments) {
        console.log('image')
        const url = file[1].url
        const embed = new EmbedBuilder()
          .setTitle('New submit')
          .setDescription(`Sent by: ${msg.author.username}`)
          .setImage(url)
          .setTimestamp()
          .setColor(0x2c2c2c)
          .setFooter({ text: 'inspiration' })

        const publicEmbed = new EmbedBuilder()
          .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL() })
          .setImage(url)
          .setTimestamp()
          .setColor(0x2c2c2c)
          .setFooter({ text: 'inspiration' })

        const reply = await client.channels.cache.get('1282342934804697169').send({ embeds: [embed], components: [sendRow] })

        const collector = reply.createMessageComponentCollector({
          componentType: ComponentType.Button,
        })

        collector.on('collect', async (i) => {
          if (i.customId === 'send') {
            reply.delete()
            const categoryReply = await client.channels.cache.get('1282342934804697169').send({ embeds: [embed], components: [categoryRow] })
        
            const categoryCollector = categoryReply.createMessageComponentCollector({
              componentType: ComponentType.StringSelect,
            })
        
            categoryCollector.on('collect', async (i) => {
    
              if (i.values.includes('gameplay')) {
                await client.channels.cache.get('968857527372611594').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('art-inspire')) {
                await client.channels.cache.get('1066648380811526145').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('design')) {
                await client.channels.cache.get('968857360523198494').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('modern')) {
                await client.channels.cache.get('968857326964572210').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('art')) {
                await client.channels.cache.get('968859084075970611').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('neo-design')) {
                await client.channels.cache.get('968884547242590228').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('effect')) {
                await client.channels.cache.get('1027971116511281264').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('other')) {
                await client.channels.cache.get('968880591049228299').send({ embeds: [publicEmbed] })
              }
    
              await i.reply('sent ✅')
              await msg.author.send(`your work has been accepted and sent to: ${i.values} ✅`)
              await categoryReply.delete()
    
            })
          }
        
          if (i.customId === 'cancel') {
            i.reply('deleted ❌')
            msg.author.send('your work has been canceled ❌')
            msg.delete()
            reply.delete()
          }
    
        })
      }

    }

    else if (msg.content != '') {

      let attachments = msg.attachments
      let content = msg.content
      for (let file of attachments) {
        console.log('image')
        const url = file[1].url
        const embed = new EmbedBuilder()
          .setTitle('New submit')
          .setDescription(`Sent by: ${msg.author.username}, comment: ${content}`)
          .setImage(url)
          .setTimestamp()
          .setColor(0x2c2c2c)
          .setFooter({ text: 'inspiration' })

        const publicEmbed = new EmbedBuilder()
          .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL() })
          .setDescription(`comment: ${content}`)
          .setImage(url)
          .setTimestamp()
          .setColor(0x2c2c2c)
          .setFooter({ text: 'inspiration' })

        const reply = await client.channels.cache.get('1282342934804697169').send({ embeds: [embed], components: [sendRow] })

        const collector = reply.createMessageComponentCollector({
          componentType: ComponentType.Button,
        })

        collector.on('collect', async (i) => {
          if (i.customId === 'send') {
            reply.delete()
            const categoryReply = await client.channels.cache.get('1282342934804697169').send({ embeds: [embed], components: [categoryRow] })
        
            const categoryCollector = categoryReply.createMessageComponentCollector({
              componentType: ComponentType.StringSelect,
            })
        
            categoryCollector.on('collect', async (i) => {
    
              if (i.values.includes('gameplay')) {
                await client.channels.cache.get('968857527372611594').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('art-inspire')) {
                await client.channels.cache.get('1066648380811526145').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('design')) {
                await client.channels.cache.get('968857360523198494').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('modern')) {
                await client.channels.cache.get('968857326964572210').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('art')) {
                await client.channels.cache.get('968859084075970611').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('neo-design')) {
                await client.channels.cache.get('968884547242590228').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('effect')) {
                await client.channels.cache.get('1027971116511281264').send({ embeds: [publicEmbed] })
              }
    
              if (i.values.includes('other')) {
                await client.channels.cache.get('968880591049228299').send({ embeds: [publicEmbed] })
              }
    
              await i.reply('sent ✅')
              await msg.author.send(`your work has been accepted and sent to: ${i.values} ✅`)
              await categoryReply.delete()
    
            })
          }
        
          if (i.customId === 'cancel') {
            i.reply('deleted ❌')
            msg.author.send('your work has been canceled ❌')
            msg.delete()
            reply.delete()
          }
    
        })
      }

    }

  }

  else if (attachment == undefined) {

    console.log('link')

    const embed = new EmbedBuilder()
      .setTitle('New submit')
      .setDescription(`Sent by: ${msg.author.username}`)
      .addFields({ name: 'link', value: msg.content, inline: true })
      .setTimestamp()
      .setColor(0x2c2c2c)
      .setFooter({ text: 'inspiration' })
    
    const reply = await client.channels.cache.get('1282342934804697169').send({ embeds: [embed], components: [sendRow] })
    
    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
    })
    
    collector.on('collect', async (i) => {
      if (i.customId === 'send') {
        reply.delete()
        const categoryReply = await client.channels.cache.get('1282342934804697169').send({ embeds: [embed], components: [categoryRow] })
    
        const categoryCollector = categoryReply.createMessageComponentCollector({
          componentType: ComponentType.StringSelect,
        })
    
        categoryCollector.on('collect', async (i) => {

          if (i.values.includes('gameplay')) {
            await client.channels.cache.get('968857527372611594').send(msg.content)
          }

          if (i.values.includes('art-inspire')) {
            await client.channels.cache.get('1066648380811526145').send(msg.content)
          }

          if (i.values.includes('design')) {
            await client.channels.cache.get('968857360523198494').send(msg.content)
          }

          if (i.values.includes('modern')) {
            await client.channels.cache.get('968857326964572210').send(msg.content)
          }

          if (i.values.includes('art')) {
            await client.channels.cache.get('968859084075970611').send(msg.content)
          }

          if (i.values.includes('neo-design')) {
            await client.channels.cache.get('968884547242590228').send(msg.content)
          }

          if (i.values.includes('effect')) {
            await client.channels.cache.get('1027971116511281264').send(msg.content)
          }

          if (i.values.includes('other')) {
            await client.channels.cache.get('968880591049228299').send(msg.content)
          }

          await i.reply('sent ✅')
          await msg.author.send(`your work has been accepted and sent to: ${i.values} ✅`)
          await categoryReply.delete()

        })
      }
    
      if (i.customId === 'cancel') {
        i.reply('deleted ❌')
        msg.author.send('your work has been canceled ❌')
        msg.delete()
        reply.delete()
      }
    }) 

  }

})



// AUTH

client.login(process.env.TOKEN)