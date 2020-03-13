import { MessageAttachment } from 'discord.js';

import Controller from '../../ts/abstract/Controller';
import CardHelper from '../helpers/CardHelper';

import { IListener } from '../../ts/interface/IListener';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';

class TestController extends Controller {
  card: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isBotCall(message)) {
        return;
      }

      const rawContent = message?.content;

      const [_, content] = rawContent?.split(this.DELIMITER) || [];

      if (content !== 'loadCard') {
        return;
      }

      const card = await CardHelper.loadCard(UnoColor.BLACK, UnoCard.REVERT);
      const attachment = new MessageAttachment(card);

      message.channel.send(`<@${message.author.id}> used the card`, attachment);
    }
  };
}

export default new TestController();
