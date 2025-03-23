const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Desabilitar verificação do certificado SSL

async function solicitacao(resumo) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: `Formalize um chamado de solicitação de Infraestrutura de TI com as seguintes informações:
                    
                    - **Título** do chamado, incluindo setor e empresa (se disponíveis).
                    - **Solicitante**:
                    - **Descrição do problema**:
                    - **Ações realizadas** até o momento:
                    - **Ações necessárias** para resolver o problema:
                    - **Observações** (se houver):
                    
                    Resumo: \n\n${resumo}` }]
                }]
            },
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Não foi possível gerar a formalização.";

    } catch (error) {
        console.error("Erro ao acessar a API do GEMINI:", error);
        return "❌ Erro ao processar a formalização do seu chamado.";
    }
}

async function sendLongMessage(interaction, message) {
    const chunks = message.match(/[\s\S]{1,2000}/g) || ["❌ Erro ao gerar o chamado."];

    for (let i = 0; i < chunks.length; i++) {
        if (i === 0) {
            await interaction.editReply(chunks[i]); // Primeira parte substitui a resposta original
        } else {
            await interaction.followUp(chunks[i]); // As demais são enviadas separadamente
        }
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('solicitacao')
        .setDescription('Formaliza um chamado usando IA do GEMINI')
        .addStringOption(option =>
            option.setName('resumo')
                .setDescription('Descreva o problema, incluindo setor e ações já realizadas...')
                .setRequired(true)),

    async execute(interaction) {
        const resumo = interaction.options.getString("resumo");

        await interaction.reply("⏳ Processando a formalização da sua solicitação...");
        const chamadoFormalizado = await solicitacao(resumo);

        await sendLongMessage(interaction, `📌 **Chamado Formalizado:**\n${chamadoFormalizado}`);
    }
};
