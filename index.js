const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Desabilitar a verificação do certificado SSL

const { TOKEN } = process.env;

const fs = require("node:fs");
const path = require("node:path");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Estruturação dos paths e carregamento dos comandos
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `Esse comando em ${filePath} está com "data" ou "execute" ausentes.`
    );
  }
}

// Importando e registrando eventos
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  event(client);
}

// Login do bot
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Pronto! Login realizado como ${readyClient.user.tag}`);
});

client.login(TOKEN);
