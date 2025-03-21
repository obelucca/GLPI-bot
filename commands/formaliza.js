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

                        - **Título** do chamado, com o nome do setor(se for informado), e empresa no formato ( titulo = problema estritamente resumido - Empresa/setor)
                        - **Solicitante:**
                        - **Descrição do problema:**
                        - **Ações realizadas** até o momento
                        - **Observações** (essa opção so adicione se estiver disponivel no resumo.)

                        siga esse padrão sem exceção de exemplo:
                        Renomeação de Computador e Inventário GLPI - Premium/RH
                        Solicitante: Infraestrutura TI (South)

                        Descrição do problema:

                        O computador da usuária Thais, do setor de RH na sede Grow da Premium, foi renomeado para "PRMCWNOT24" e inserido no inventário do GLPI. Esta ação foi necessária para o controle de inventário da empresa, e a máquina é essencial para as atividades da usuária. 

                        Ações realizadas:

                        Renomeação do computador para "PRMCWNOT24".
                        Instalação do agente GLPI no computador.
                        Forçada a entrada do computador no inventário do GLPI.
                        Validação da presença do computador no inventário do GLPI.
                                                
                        Com base no resumo fornecido abaixo, organize essas informações de maneira clara e formal, como se fosse um documento oficial de registro:
                        

                        Resumo: 
                        \n\n${resumo}`
                     }]
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
                .setDescription('Descreva o problema, não economize nos detalhes...')
                .setRequired(true)),

    async execute(interaction) {
        const resumo = interaction.options.getString("resumo");

        await interaction.reply("⏳ Processando o chamado...");
        const chamadoFormalizado = await formalizarChamado(resumo);

        await interaction.editReply(`📌 **Chamado Formalizado:**\n${chamadoFormalizado}`);
    }
};