const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Return a button!")
    .addStringOption((option) =>
      option.setName("title").setDescription("Enter a title.").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("desc")
        .setDescription("Enter a description")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const title = interaction.options.getString("title");
    const desc = interaction.options.getString("desc");

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(desc)
      .setColor(client.color);

    const button = new ButtonBuilder()
      .setCustomId("verificationButton")
      .setLabel("VERIFY")
      .setStyle(ButtonStyle.Success);

    await interaction.deferReply();
    await interaction.deleteReply();
    await interaction.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
