const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

const row = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId("select")
    .setPlaceholder("Selecione uma opção")
    .addOptions([
      { label: "SouthTI", value: "SouthTI" },
      { label: "Plamev", value: "Plamev" },
      { label: "Pronto Assistência", value: "ProntoAssistencia" },
      { label: "Premium Clube", value: "PremiumClube" },
      { label: "Ta Rastreado", value: "TaRastreado" },
      { label: "Essential BPO", value: "Essential" },
    ])
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wifi")
    .setDescription("Redes Wi-fi disponíveis"),

  async execute(interaction) {
     await interaction.reply({
      content: "Selecione uma das redes abaixo:",
      components: [row],
    });

    const message = await interaction.fetchReply();

    setTimeout(() => {
      message.delete().catch(console.error);
    }, 30000);
  },
};
