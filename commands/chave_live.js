const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const path = require("path");

const pop = '../public/pop_live.pdf'

module.exports = {

    data: new SlashCommandBuilder()
        .setName("live")
        .setDescription("Mostra as chaves de transmissão."),

    async execute(interaction) {
        const file = new AttachmentBuilder(path.join(__dirname, `${pop}`)); // Certifique-se de que o arquivo está na mesma pasta

        const exampleEmbed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Chaves de transmissão")
            .setDescription("O arquivo PDF está anexado abaixo.")
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Atendimento', value: 'szh4-5km8-6khk-dp3u-2byp \nhttps://tv.premiumclube.org.br/atendimento', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Eventos', value: '01bk-qewk-a9q7-q2p8-bbqe\nhttps://tv.premiumclube.org.br/eventos', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Recebíveis', value: '82qh-amzb-jp37-5jkv-cqat\nhttps://tv.premiumclube.org.br/recebiveis', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Vistoria', value: 'sh12-cxq6-43y0-zatw-bf6c\nhttps://tv.premiumclube.org.br/vistoria', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Ta Rastreado', value: 'tc25-w8u7-pkak-03f1-cu9j\nhttps://tv.tarastreado.com.br/t-i', inline: true },
            );

        await interaction.reply({ embeds: [exampleEmbed], files: [file] });
    }
};
