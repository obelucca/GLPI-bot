const { SlashCommandBuilder} = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();

const { SENHA_DIGISAC } = process.env;

module.exports = {
   data: new SlashCommandBuilder()
        .setName("digisac")
        .setDescription("Informa os dados de acesso ao Digisac"),

    async execute(interaction){ 
        await interaction.reply(`ti.suporte@southti.com.br \n${SENHA_DIGISAC}`)
    }
}