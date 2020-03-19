import { Message, User, MessageAttachment } from 'discord.js';

import { IEmbed } from '../../ts/interface/IEmbed';
import { EmbedColor } from '../../ts/enum/EmbedColor';
import SuffixHelper from './SuffixHelper';
import { UnoColor } from '../../ts/enum/UnoColor';
import PlayerHelper from './PlayerHelper';
import GameHelper from './GameHelper';
import CardHelper from './CardHelper';

class EmbedHelper {
  public static sendError(
    text: string,
    { channel, author, member }: Message
  ): void {
    const _name = member?.nickname ?? author.username;

    const embed: IEmbed = {
      title: `Gomen'nasai, ${_name}-${SuffixHelper.randomSuffix()}`,
      description: text,
      color: EmbedColor.RED,
      thumbnail: {
        url:
          'https://i.pinimg.com/564x/c9/4a/65/c94a6527d4a77cd548fd94f3fab5cfbd.jpg'
      }
    };

    channel.send({ embed });
  }

  public static async sendTable({ author, channel }: Message) {
    const game = await GameHelper.getGame(channel.id);
    if (!game) return;

    const tableCard = game.table[game.table.length - 1];
    const [attachment] = await CardHelper.loadHand([tableCard]);

    const { id } = game.players[game.playerTurn];
    const player = await PlayerHelper.getUser(id);

    const color =
      tableCard.color === UnoColor.BLACK
        ? EmbedColor.BLACK
        : tableCard.color === UnoColor.BLUE
        ? EmbedColor.BLUE
        : tableCard.color === UnoColor.GREEN
        ? EmbedColor.GREEN
        : tableCard.color === UnoColor.RED
        ? EmbedColor.RED
        : tableCard.color === UnoColor.YELLOW
        ? EmbedColor.YELLOW
        : EmbedColor.BLACK;

    const embed: IEmbed = {
      title: 'Table',
      color,
      description: `It's **${
        player.username
      }-${SuffixHelper.randomSuffix()}** turn`,
      thumbnail: {
        url:
          'https://i.pinimg.com/564x/98/28/80/982880627a30fb61e39b0b80fb840127.jpg'
      }
    };

    author.send({ embed, files: [new MessageAttachment(attachment)] });
  }

  public static async sendHello(user: User) {
    const embed: IEmbed = {
      title: `Kon'nichiwa, ${user.username}-${SuffixHelper.randomSuffix()} :3`,
      color: EmbedColor.GREEN,
      thumbnail: {
        url:
          'https://i.pinimg.com/564x/44/1e/a5/441ea552b3bdf4a319e393225469cda3.jpg'
      }
    };

    user.send({ embed });
  }
}

export default EmbedHelper;
