import { MessageAttachment } from 'discord.js';

import Controller from '../../ts/abstract/Controller';

import CardHelper from '../helpers/CardHelper';

import { IListener } from '../../ts/interface/IListener';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';

class CardController extends Controller {
  card: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'loadCard')) {
        return;
      }

      const card = await CardHelper.loadCard(UnoColor.RED, UnoCard.PLUS_TWO);
      const attachment = new MessageAttachment(card);

      message?.channel.send(
        `<@${message.author.id}> used the card`,
        attachment
      );
    }
  };
}

export default new CardController();
