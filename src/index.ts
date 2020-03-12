import Discord from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Discord.Client();

const TOKEN = process.env.TOKEN ?? "";
const PREFIX = process.env.PREFIX ?? "";
const DELIMITER = process.env.DELIMITER ?? "";

client.on("ready", () => {
  console.log(`A kawaii hello from ${client.user?.username}!`);
});

client.on("message", message => {
  const { content: rawContent } = message;

  const [messagePrefix, content] = rawContent?.split(DELIMITER) || [];

  if (messagePrefix !== PREFIX) {
    return;
  }

  if (content === "startGame") {
    message.author?.send("Your cards: {nothing yet ^^}");
  }
});

client.login(TOKEN);
