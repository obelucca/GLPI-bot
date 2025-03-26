
const { SlashCommandBuilder } = require('discord.js');
const dns = require('dns');
const ping = require('ping');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Testa a conectividade de um IP ou URL')
        .addStringOption(option =>
            option.setName('alvo')
                .setDescription('O IP ou URL a ser testado')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const alvo = interaction.options.getString('alvo');
        let mensagem = `🔎 **Testando conectividade com:** \`${alvo}\`\n`;

        // 🔹 1. Teste de resolução DNS
        dns.lookup(alvo, async (err, address) => {
            if (err) {
                mensagem += '❌ **DNS:** Não foi possível resolver o domínio.\n';
            } else {
                mensagem += `✅ **DNS:** Resolvido para \`${address}\`\n`;
            }

            // 🔹 2. Teste de Ping
            const respostaPing = await ping.promise.probe(alvo);
            if (respostaPing.alive) {
                mensagem += `✅ **Ping:** Respondeu em ${respostaPing.time}ms\n`;
            } else {
                mensagem += '❌ **Ping:** Falha ao responder.\n';
            }

            // 🔹 3. Teste de conexão HTTP/HTTPS
            try {
                const respostaHTTP = await axios.get(`http://${alvo}`, { timeout: 5000 });
                mensagem += `✅ **HTTP:** Respondeu com status \`${respostaHTTP.status}\`\n`;
            } catch (error) {
                mensagem += '❌ **HTTP:** Não respondeu.\n';
            }

            // Enviar resposta final
            interaction.editReply(mensagem);
        });
    }
};
