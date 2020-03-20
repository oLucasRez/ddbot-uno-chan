import { MessageAttachment, User } from 'discord.js';

import { IGame } from '../../ts/interface/IGame';
import { IEmbed } from '../../ts/interface/IEmbed';

import Logger from '../../logger';

import { EmbedColor } from '../../ts/enum/EmbedColor';
import { UnoColor } from '../../ts/enum/UnoColor';

class TableHelper {
  public static async sendTable(
    user: User,
    playerTurn: string,
    game: IGame,
    attachment: Buffer
  ) {
    const topCard = game.table[game.table.length - 1];

    let color: EmbedColor;

    switch (topCard.color) {
      case UnoColor.BLACK:
        color = EmbedColor.BLACK;
        break;
      case UnoColor.RED:
        color = EmbedColor.RED;
        break;
      case UnoColor.YELLOW:
        color = EmbedColor.YELLOW;
        break;
      case UnoColor.BLUE:
        color = EmbedColor.BLUE;
        break;
      case UnoColor.GREEN:
        color = EmbedColor.GREEN;
        break;
    }

    const embed: IEmbed = {
      title: 'Table',
      color,
      description: `It's **${playerTurn}-${Logger.randomSuffix()}** turn`,
      thumbnail: {
        url:
          'https://i.pinimg.com/564x/98/28/80/982880627a30fb61e39b0b80fb840127.jpg'
      }
    };

    user.send({ embed, files: [new MessageAttachment(attachment)] });
  }
}

export default TableHelper;
