const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = readdirSync('./src/commands');
    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`./src/commands/${folder}`).filter(
        (file) => file.endsWith('.js')
      );

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: '10' }).setToken(process.env.token);
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationCommands(process.env.rest_client_id), {
        body: client.commandArray,
      });

      console.log('Successfully reloaded application (/) commands.');
    } catch (err) {
      console.error(err);
    }
  };
};
