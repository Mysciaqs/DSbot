const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [
        {
          name: '/help',
          type: ActivityType.Playing,
        },
      ],
      status: 'online',
    });
    console.log(`${client.user.tag} has logged into Discord!`);
  },
};
