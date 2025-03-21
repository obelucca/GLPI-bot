const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios');
const fetch = require("node-fetch");

const dotenv = require('dotenv');
dotenv.config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //desabilitar a verificação do certificado ssl 

async function formalizarChamado(resumo){
    try {
    
        const response = await axios({
            method: "POST",
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                contents: [{
                    parts: [{ text: `Formalize um chamado de Infraestrutura de TI com as seguintes informações, extraídas do resumo fornecido. Verifique as seguintes informações:

- **Data de hoje** (verifique na web)
- **Título** do chamado
- **Solicitante** (nome ou departamento)
- **Ações realizadas** até o momento
- **Setor** envolvido (se aplicável)
- **Empresa** e **sede** (se houver)
  
Com base no resumo fornecido abaixo, organize essas informações de maneira clara e formal, como se fosse um documento oficial de registro:

Resumo: 
\n\n${resumo}
` }]
                }]
            }
        });

        const data = response.data;
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Não foi possível gerar a formalização.";   
 
    } catch(error){
        console.error("Erro ao acessar a API do GEMINI:", error);
        return "Erro ao processar o seu chamado.";
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('formalizar')
        .setDescription('Formaliza um chamado usando IA do GEMINI')
        .addStringOption(option =>
            option.setName('resumo')
                .setDescription('Descreva o problema')
                .setRequired(true)),

    async execute(interaction) {
        const resumo = interaction.options.getString("resumo");

        await interaction.reply("⏳ Processando o chamado...");
        const chamadoFormalizado = await formalizarChamado(resumo);

        await interaction.editReply(`📌 **Chamado Formalizado:**\n${chamadoFormalizado}`);
    }
};