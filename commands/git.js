const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
         .setName("git")
         .setDescription("Relembrar comandos do git!"),
 
     async execute(interaction){ 
         await interaction.reply("Pong!")
     }
 }