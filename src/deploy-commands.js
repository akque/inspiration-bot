require('dotenv').config()
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'lawet',
    description: '...',
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const registerCommand = async () => {
  try {
    console.log('started refreshing commands');
    
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  
    console.log('successfully reloaded commands');
  } catch (error) {
    console.error(error);
  }
}

registerCommand()