const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
} = require('@discordjs/builders');
const { TextInputStyle } = require('discord.js');

module.exports = {
  data: {
    name: 'verificationButton',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('verificationModal')
      .setTitle('VERIFICATION');
    const textInput = new TextInputBuilder()
      .setCustomId('verificationModalEmail')
      .setLabel('Enter your email from CodeBusters platform')
      .setRequired(true)
      .setStyle(TextInputStyle.Short);
    modal.addComponents(new ActionRowBuilder().addComponents(textInput));
    await interaction.showModal(modal);
  },
};
