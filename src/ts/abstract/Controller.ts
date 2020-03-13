import { Message } from 'discord.js';

export default abstract class Controller {
  protected PREFIX: string;
  protected DELIMITER: string;

  constructor() {
    this.PREFIX = process.env.PREFIX ?? '';
    this.DELIMITER = process.env.DELIMITER ?? '';
  }

  protected isBotCall(message: Message): boolean {
    const messageWasFromBot =
      message.author.bot ||
      message.channel.type === 'dm' ||
      !message.content.startsWith(this.PREFIX);

    return !messageWasFromBot;
  }
}
