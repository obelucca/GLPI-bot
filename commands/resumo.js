const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Desabilitar a verificação do certificado SSL

async function gerarResumo(texto) {
  try {
    const response = await axios({
      method: "POST",
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        contents: [
          {
            parts: [
              {
                text: `Resuma o seguinte texto de forma clara e objetiva sem que retire sua esseência:

                    ${texto}`,
              },
            ],
          },
        ],
      },
    });

    const data = response.data;
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não foi possível gerar o resumo."
    );
  } catch (error) {
    console.error("Erro ao acessar a API do GEMINI:", error);
    return "Erro ao processar sua solicitação.";
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resumir")
    .setDescription("Gera um resumo de um texto usando IA")
    .addStringOption((option) =>
      option
        .setName("texto")
        .setDescription("Texto que deseja resumir")
        .setRequired(true)
    ),

  async execute(interaction) {
    const texto = interaction.options.getString("texto");

    await interaction.reply("⏳ Gerando resumo...");
    const resumoGerado = await gerarResumo(texto);

    await interaction.editReply(`📌 **Resumo:**\n${resumoGerado}`);
  },
};
