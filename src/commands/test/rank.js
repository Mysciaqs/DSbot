const { SlashCommandBuilder } = require('discord.js');
const { RankCardBuilder } = require('discord-card-canvas');
const { writeFileSync } = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Return my rank!'),
  async execute(interaction, client) {
    const canvasRank = await new RankCardBuilder({
      currentLvl: 102,
      currentRank: 563,
      currentXP: 71032,
      requiredXP: 95195,
      backgroundColor: '#070D26',
      avatarImgURL:
        'https://ps.w.org/image-comparison/assets/icon-256x256.png?rev=2587037',
      nicknameText: {
        content: interaction.user.username,
      },
      userStatus: 'online',
      colorTextDefault: '#CBCCD2',
      progressBarColor: '#F74747',
      avatarBackgroundColor: '#F74747',
      currentXPColor: '#F5A22E',
      avatarBackgroundEnable: false,
    }).build();
    await interaction.reply({
      files: [{ attachment: canvasRank.toBuffer(), name: 'rank.png' }],
      ephemeral: true,
    });
  },
};

// const canvasRank = await new RankCardBuilder({
//     currentLvl: 102,
//     currentRank: 563,
//     currentXP: 71032,
//     requiredXP: 95195,
//     backgroundImgURL: 'background_blue.png',
//     avatarImgURL: 'avatar.jpg',
//     nicknameText: { content: 'xNinja_Catx', font: 'Nunito', color: '#0CA7FF' },
//     userStatus: 'idle',
// }).build();

// // Saving an image
// fs.writeFileSync('rank_blue.png', canvasRank.toBuffer());

// // Example of sending to a channel
// channel.send(files: [{ attachment: canvasRank.toBuffer(), name: 'rank.png' }])
