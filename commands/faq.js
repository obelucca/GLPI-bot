const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Desabilitar a verificação do certificado SSL

async function gerarResposta(pergunta) {
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
                text: `Gere respostas pré-definidas para dúvidas frequentes. Seguindo as seguintes regras:
                        -Você é um assistente de suporte técnico altamente profissional e educado. Sua tarefa é fornecer uma resposta clara, objetiva e útil com base na seguinte situação descrita pelo cliente.
                        -Analise atentamente o contexto da solicitação.
                        -Se for uma dúvida, responda de forma informativa e direta.
                        -Se for um problema técnico, forneça possíveis soluções ou encaminhamentos.
                        -Sempre mantenha um tom educado e profissional.
                        -Caso precise redirecionar o cliente para outro setor, explique o motivo e forneça orientações claras sobre os próximos passos.

                    ${pergunta}`,
              },
            ],
          },
        ],
      },
    });

    const data = response.data;
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não foi possível gerar uma resposta."
    );
  } catch (error) {
    console.error("Erro ao acessar a API do GEMINI:", error);
    return "Erro ao processar sua solicitação.";
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faq")
    .setDescription("Gera uma resposta para dúvidas frequentes com IA")
    .addStringOption((option) =>
      option
        .setName("pergunta")
        .setDescription("Descreva a dúvida ou situação")
        .setRequired(true)
    ),

  async execute(interaction) {
    const pergunta = interaction.options.getString("pergunta");

    await interaction.reply("⏳ Gerando resposta...");
    const respostaGerada = await gerarResposta(pergunta);

    await interaction.editReply(`📌 **Resposta Gerada:**\n${respostaGerada}`);
  },
};
