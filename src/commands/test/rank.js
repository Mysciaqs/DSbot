const { SlashCommandBuilder } = require('discord.js');
const { RankCardBuilder } = require('discord-card-canvas');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Return my rank!')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription("The member you'd like to check rank.")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    let user;
    user = interaction.options.getUser('target');
    if (!user) user = interaction.user;
    const { data } = await axios.get(
      'http://3.71.14.243:5021/openapi/discord/stats/user?id=666'
    );
    // const { data } = await axios.get(
    //   `http://3.71.14.243:5021/openapi/discord/stats/user?id=${user.id}`
    // );
    const canvasRank = await new RankCardBuilder({
      currentLvl: data.currentLvl,
      currentRank: data.currentRank,
      currentXP: data.currentXP,
      requiredXP: data.requiredXP,
      backgroundColor: '#070D26',
      avatarImgURL: data.avatarImgURL,
      nicknameText: {
        content: data.nicknameText.content,
        color: '#F5A22E',
      },
      userStatus: 'online',
      colorTextDefault: '#CBCCD2',
      progressBarColor: '#F74747',
      avatarBackgroundColor: '#F5A22E',
      currentXPColor: '#F5A22E',
      avatarBackgroundEnable: true,
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
