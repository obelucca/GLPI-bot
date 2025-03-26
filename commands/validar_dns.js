const { SlashCommandBuilder } = require('discord.js');
const dns = require('dns').promises;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('validar_dns')
        .setDescription('Faz lookup de DNS e verifica propagação')
        .addStringOption(option =>
            option.setName('dominio')
                .setDescription('O domínio a ser validado (ex: google.com)')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();
        const dominio = interaction.options.getString('dominio');
        let mensagem = `🔎 **Validação de DNS para** \`${dominio}\`\n`;

        try {
            // 🔹 Registro A (IPv4)
            const registrosA = await dns.resolve4(dominio).catch(() => []);
            if (registrosA.length > 0) {
                mensagem += `✅ **Registro A:** ${registrosA.join(', ')}\n`;
            } else {
                mensagem += `❌ **Registro A:** Não encontrado\n`;
            }

            // 🔹 Registro AAAA (IPv6)
            const registrosAAAA = await dns.resolve6(dominio).catch(() => []);
            if (registrosAAAA.length > 0) {
                mensagem += `✅ **Registro AAAA:** ${registrosAAAA.join(', ')}\n`;
            } else {
                mensagem += `❌ **Registro AAAA:** Não encontrado\n`;
            }

            // 🔹 Registro MX (E-mails)
            const registrosMX = await dns.resolveMx(dominio).catch(() => []);
            if (registrosMX.length > 0) {
                const mxList = registrosMX.map(mx => `${mx.exchange} (prioridade ${mx.priority})`).join(', ');
                mensagem += `✅ **Registro MX:** ${mxList}\n`;
            } else {
                mensagem += `❌ **Registro MX:** Não encontrado\n`;
            }

            // 🔹 Registro TXT (SPF, DKIM, etc.)
            const registrosTXT = await dns.resolveTxt(dominio).catch(() => []);
            if (registrosTXT.length > 0) {
                const txtList = registrosTXT.map(txt => `"${txt.join('')}"`).join(', ');
                mensagem += `✅ **Registro TXT:** ${txtList}\n`;
            } else {
                mensagem += `❌ **Registro TXT:** Não encontrado\n`;
            }

        } catch (error) {
            mensagem += `⚠️ **Erro:** ${error.message}`;
        }

        await interaction.editReply(mensagem);
    }
};
