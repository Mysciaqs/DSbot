const axios = require('axios');
const { createChannel } = require('discord.js');

module.exports = {
  data: {
    name: 'verificationModal',
  },
  async execute(interaction, client) {
    const verificationRoleId = '1079054312438767686';
    const verificationRole =
      interaction.guild.roles.cache.get(verificationRoleId);
    const email = interaction.fields.getTextInputValue(
      'verificationModalEmail'
    );
    const { data } = await axios.get(
      `${process.env.API_URL}/discord/verify/user?id=${interaction.user.id}&email=${email}`
    );
    if (
      (data.code == 201 || data.code == 200) &&
      !interaction.member.roles.cache.has(verificationRoleId)
    ) {
      await interaction.member.roles.add(verificationRoleId);
      await interaction.reply({
        content: `➕ | The **${verificationRole.name}** role has been added successfully!`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `Something went wrong!`,
        ephemeral: true,
      });
    }
  },
};
