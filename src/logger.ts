import { Suffix } from './ts/enum/Suffix';
import { Message, User, Channel, DMChannel, TextChannel } from 'discord.js';
import { IEmbed } from './ts/interface/IEmbed';
import { EmbedColor } from './ts/enum/EmbedColor';

class Logger {
  private static _consoleColors: any = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
  };

  public static randomSuffix(): string {
    const suffixes = Object.values(Suffix);

    return suffixes[Math.floor(Math.random() * suffixes.length)];
  }

  static serverLog(message: string): void {
    const { green, reset } = this._consoleColors;

    console.log(`${green}%s${reset}`, `[server-sama]: ^-^ ${message}`);
  }
  static serverWarn(message: string): void {
    const { yellow, reset } = this._consoleColors;

    console.log(`${yellow}%s${reset}`, `[server-sama]:'•_• ${message}`);
  }
  static serverError(message: string): void {
    const { red, reset } = this._consoleColors;

    console.log(`${red}%s${reset}`, `[server-sama]: x_x ${message}`);
  }

  public static sendError(
    text: string,
    channel: TextChannel | DMChannel,
    userName: string
  ): void {
    const embed: IEmbed = {
      title: `Gomen'nasai, ${userName}-${this.randomSuffix()}`,
      description: text,
      color: EmbedColor.RED,
      thumbnail: {
        url:
          'https://i.pinimg.com/564x/c9/4a/65/c94a6527d4a77cd548fd94f3fab5cfbd.jpg'
      }
    };

    channel.send({ embed });
  }

  public static async sendDMHello(user: User) {
    const embed: IEmbed = {
      title: `Kon'nichiwa, ${user.username}-${this.randomSuffix()} :3`,
      color: EmbedColor.GREEN,
      thumbnail: {
        url:
          'https://i.pinimg.com/564x/44/1e/a5/441ea552b3bdf4a319e393225469cda3.jpg'
      }
    };

    user.send({ embed });
  }
}

export default Logger;
