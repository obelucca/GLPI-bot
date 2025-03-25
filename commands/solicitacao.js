const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Desabilitar verificação do certificado SSL

async function solicitacao(resumo) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: `Formalize um chamado de solicitação de Infraestrutura de TI com as seguintes informações, todas informações trazidas no resumo, devem estar no decorrer do chamado.
                    
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

        if (chamadoFormalizado.length > 2000) {
            const filePath = "chamado_formalizado.txt";
            fs.writeFileSync(filePath, chamadoFormalizado, "utf-8");
            const attachment = new AttachmentBuilder(filePath);
            await interaction.editReply({
                content: "📎 O chamado formalizado é muito longo. Baixe o arquivo abaixo:",
                files: [attachment]
            });
            fs.unlinkSync(filePath); // Remove o arquivo após o envio
        } else {
            await interaction.editReply(`📌 **Chamado Formalizado:**\n${chamadoFormalizado}`);
        }
    }
};
