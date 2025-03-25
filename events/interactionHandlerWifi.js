module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isStringSelectMenu()) {
      if (interaction.values && interaction.values.length > 0) {
        const select = interaction.values[0];
        if (select === "SouthTI") {
          await interaction.reply(
            "🛜SSID: SouthTI\n🔑Senha: $0UthT1#@!\n\n🛜SSID: South TI Visitante\n🔑Senha: somossouthti"
          );
        } else if (select === "Plamev") {
          await interaction.reply(
            "🛜SSID: Plamev\n🔑Senha: #!Pl@m3v!#\n\n🛜SSID: Plamev Visitante\n🔑Senha: somosplamev"
          );
        } else if (select === "ProntoAssistencia") {
          await interaction.reply(
            "🛜SSID: Pronto Assistencia\n🔑Senha: 2mP8w7:mXy;/\n\n🛜SSID: Pronto Assistencia Visitante\n🔑Senha: somospronto"
          );
        } else if (select === "PremiumClube") {
          await interaction.reply(
            "🛜SSID: Premium\n🔑Senha: Pr3m1uM-w1f1\n\n🛜SSID: Premium Visitante\n🔑Senha: somospremium"
          );
        } else if (select === "TaRastreado") {
          await interaction.reply(
            "🛜SSID: TaRastreado\n🔑Senha: #!Rast34d0T@!#\n\n🛜SSID: TaRastreado Guest\n🔑Senha: somostarastreado"
          );
        } else if (select === "Essential") {
          await interaction.reply(
            "🛜SSID: Essentia BPO\n🔑Senha: LySIMo!310\n\n🛜SSID: Essential BPO Guest\n🔑Senha: somosessentialbpo"
          );
        } else {
          await interaction.reply("Seleção inválida.");
        }
      }
    }

    // Verificar se é um comando de chat
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error("Comando não encontrado");
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply("Tivemos um erro ao executar o comando");
    }
  });
};
