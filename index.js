const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //desabilitar a verificação do certificado ssl


const{ TOKEN, CLIENT_ID, GUILD_ID } = process.env

//importação de comandos
const fs =  require("node:fs")
const path= require("node:path")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

//estruturação dos paths
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath) 
    
    if ("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está com "data"`)
    }

}


//login do bot
client.once(Events.ClientReady, readyClient => {
	console.log(`Pronto! Login realizado como ${readyClient.user.tag}`);
});

client.login(TOKEN);

//listener de interações

client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) {
            console.error("Comando nao encontrado")
            return
        } 
        try {
            await command.execute(interaction)
        } catch (error){
            console.error(error)
            await interaction.reply("Tivemos um erro ao executar o comando")
        }
})