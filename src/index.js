require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { readdirSync } = require('fs');
const { connect } = require('mongoose');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];
client.color = '#F74747';
client.errorColor = '#FF6961';

const functionFolders = readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
    (file) => file.endsWith('.js')
  );

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(process.env.token);
// (async () => {
//   await connect(process.env.database, {
//     dbName: '',
//   }).catch(console.error);
// })();
