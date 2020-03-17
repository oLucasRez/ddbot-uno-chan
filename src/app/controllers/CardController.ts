import { MessageAttachment } from 'discord.js';

import CardHelper from '../helpers/CardHelper';

import Controller from '../../ts/abstract/Controller';

import { ICard } from '../../ts/interface/ICard';
import { IListener } from '../../ts/interface/IListener';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';

class CardController extends Controller {
  card: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'loadHand')) {
        return;
      }

      const hand: ICard[] = [];

      for (let i = 0; i < 30; i++) {
        hand.push({
          color: UnoColor.BLACK,
          identifier: UnoCard.CHANGE,
          number: 0
        });
      }

      const handImages = await CardHelper.loadHand(hand);

      const attachments = handImages
        .sort(value => value.length)
        .map(handImage => new MessageAttachment(handImage));

      message?.channel.send(`<@${message.author.id}>-senpai hands uwu`);

      attachments.forEach(attachment => {
        message?.channel.send(attachment);
      });
    }
  };
}

export default new CardController();
