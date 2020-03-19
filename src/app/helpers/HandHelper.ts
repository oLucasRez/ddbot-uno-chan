import CardHelper from './CardHelper';
import { IPlayer } from '../../ts/interface/IPlayer';
import { MessageAttachment, User, Message } from 'discord.js';
import GameHelper from './GameHelper';
import PlayerHelper from './PlayerHelper';
import { ICard } from '../../ts/interface/ICard';

class HandHelper {
  public static newHand(draw: ICard[], numberCards: number): ICard[] {
    return draw.splice(0, numberCards);
  }

  public static async showHand(player: IPlayer): Promise<string[]> {
    const { cards, sent } = player.hand;
    const user = await PlayerHelper.getUser(player.id);

    const newSent = sent;

    const _sentRequired = Math.ceil(
      cards.length / CardHelper.MAX_CARDS_IN_LINE
    );
    const sentOverflow = sent.length - _sentRequired;

    const _handImages = await CardHelper.loadHand(player.hand.cards);
    const attachments = _handImages
      .sort(value => value.length)
      .map(handImage => new MessageAttachment(handImage));

    let numberHand: number = cards.length;
    const threshold = (numberHand: number) =>
      numberHand > CardHelper.MAX_CARDS_IN_LINE
        ? CardHelper.MAX_CARDS_IN_LINE
        : numberHand;

    sent.forEach((messageID, i) =>
      user.dmChannel.messages
        .fetch({
          around: messageID,
          limit: 1
        })
        .then(messages => {
          const message = messages.first();

          if (!attachments[i]) message?.delete();
          else {
            message?.edit(attachments[i]);

            for (let i = 0; i < threshold(numberHand); i++)
              message?.react(GameHelper.options[i]);
            numberHand -= CardHelper.MAX_CARDS_IN_LINE;
          }
        })
    );

    numberHand = cards.length;

    const promises: Promise<Message>[] = [];

    if (sentOverflow < 0) {
      for (let i = 0; i < -sentOverflow; i++) {
        const _promise = user.send(attachments[sent.length + i]);

        _promise.then(message => {
          newSent.push(message.id);

          for (let i = 0; i < threshold(numberHand); i++)
            message.react(GameHelper.options[i]);
          numberHand -= CardHelper.MAX_CARDS_IN_LINE;
        });

        promises.push(_promise);
      }
    } else if (sentOverflow > 0)
      for (let i = 0; i < sentOverflow; i++) newSent.pop();

    await Promise.all(promises);

    return newSent;
  }
}

export default HandHelper;
