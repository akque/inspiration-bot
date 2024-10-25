const { Client, GatewayIntentBits, ActivityType, EmbedBuilder, ComponentType } = require('discord.js');
const categoryRow = require('./actionRows/categoryRow')
const sendRow = require('./actionRows/sendRow')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
})

function onReady (c) {
  console.log(`${c.user.tag} is ready`)
  client.user.setPresence({
    activities: [{
      name: 'submit your work!',
      type: ActivityType.Listening,
    }]
  })
  client.user.setStatus('idle')
  client.channels.cache.get('969572233909506148').send('bot is ready 🟢')
}

function newMemberHandler (m) {
  return m.send(`<@${m.id}> Welcome to inspiration! To send a work read pinned message in <#1282413382372425748>`)
}

async function newWorkHandler (msg) {
  if (msg.author.bot) return

  if (msg.channelId != '1282413382372425748') {
    if (msg.channelId != '1283905575268388926') return
  }

  client.channels.cache.get('969572233909506148').send(`new work in <#${msg.channelId}> from ${msg.author.username}. ||<@&1028279847031668856> <@&983680839885946920>||`)

  const attachment = msg.attachments ? msg.attachments.first() : null

  if (attachment != undefined) {

    if (msg.content == '') {

      let attachments = msg.attachments
      for (let file of attachments) {
        const imagesMsg = await client.channels.cache.get('1284590468939780136').send({ files: [file[1].url] })
        const url = imagesMsg.attachments.first().url
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
              await msg.delete()
    
            })
          }
        
          if (i.customId === 'cancel') {
            i.reply('deleted ❌')
            reply.delete()
            if (msg) {
              msg.author.send('your work has been canceled ❌')
              msg.delete()
            }
          }
    
        })
      }

    }

    else if (msg.content != '') {

      let attachments = msg.attachments
      let content = msg.content
      for (let file of attachments) {
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
              await msg.delete()
    
            })
          }
        
          if (i.customId === 'cancel') {
            i.reply('deleted ❌')
            reply.delete()
            if (msg) {
              msg.author.send('your work has been canceled ❌')
              msg.delete()
            }
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

module.exports = { onReady, client, newMemberHandler, newWorkHandler }