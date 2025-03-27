module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isStringSelectMenu()) {
      if (interaction.values && interaction.values.length > 0) {
        const select = interaction.values[0];

        const redes = {
          SouthTI: "🛜SSID: SouthTI\n🔑Senha: $0UthT1#@!\n\n🛜SSID: South TI Visitante\n🔑Senha: somossouthti",
          Plamev: "🛜SSID: Plamev\n🔑Senha: #!Pl@m3v!#\n\n🛜SSID: Plamev Visitante\n🔑Senha: somosplamev",
          ProntoAssistencia: "🛜SSID: Pronto Assistência\n🔑Senha: 2mP8w7:mXy;/\n\n🛜SSID: Pronto Assistência Visitante\n🔑Senha: somospronto",
          PremiumClube: "🛜SSID: Premium\n🔑Senha: Pr3m1uM-w1f1\n\n🛜SSID: Premium Visitante\n🔑Senha: somospremium",
          TaRastreado: "🛜SSID: TaRastreado\n🔑Senha: #!Rast34d0T@!#\n\n🛜SSID: TaRastreado Guest\n🔑Senha: somostarastreado",
          Essential: "🛜SSID: Essential BPO\n🔑Senha: LySIMo!310\n\n🛜SSID: Essential BPO Guest\n🔑Senha: somosessentialbpo",
        };

        const senhaMsg = redes[select] || "Seleção inválida.";

        await interaction.reply({ content: senhaMsg });

        const message = await interaction.fetchReply();
        
        setTimeout(() => {
          message.delete().catch(console.error);
        }, 60000);
      }
    }

    
    if (interaction.isChatInputCommand()) {
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
    }
  });
};
