const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");
const axios = require("axios");
const url = `${process.env.API_URL}/discord/stats/global?limit=10`;
console.log(url);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show Top 10"),
  async execute(interaction, profileData) {
    await interaction.deferReply();

    const { username, id } = interaction.user;
    const { balance } = profileData;

    let leaderboardEmbed = new EmbedBuilder()
      .setTitle("Top 10")
      .setColor(0x45d6fd)
      .setFooter({ text: "You are not rankerd yet" });

    const { data } = await axios.get(url).catch((err) => console.log(err));

    const memberIdx = await interaction.guild.members.fetch();

    console.log(memberIdx);

    //   .findIndex((member) => member.userId === id);

    leaderboardEmbed.setFooter({
      text: `${username}, you are rank #${memberIdx + 1} with ${balance}`,
    });

    const topTen = members.slice(0, 10);

    let desc = "";
    for (let i = 0; i < topTen.length; i++) {
      let { user } = await interaction.guild.members.fetch(topTen[1].userId);
      if (!user) return;
      let userBalance = topTen[i].balance;
      desc += `**${i + 1}. ${user.username}:** ${userBalance} points\n`;
    }

    if (desc !== "") {
      leaderboardEmbed.setDescription(desc);
    }

    await interaction.editReply({ embeds: [leaderboardEmbed] });
  },
};
