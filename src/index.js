const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready!");
  console.log("test: ", process.env.TOKEN);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Augosto",
      "Sepembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const time = day + " de " + month + " de " + year;

    return time;
  };

  if (commandName === "test") {
    await interaction.reply("teste confirmado");
  } else if (commandName === "server") {
    await interaction.reply(
      `Nome servidor: ${interaction.guild.name}\nTotal de membros: ${interaction.guild.memberCount}`
    );
  } else if (commandName === "user") {
    const joinedDate = await convertTimestamp(
      interaction.member.joinedTimestamp
    );

    await interaction.reply(
      `Nome do usuario: ${interaction.member.nickname}\nEntrou: ${joinedDate}`
    );
  }
});

client.login(process.env.TOKEN);
