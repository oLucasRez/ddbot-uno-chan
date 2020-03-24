import { MessageAttachment, User, Message } from 'discord.js';

import { IPlayer } from '../../ts/interface/IPlayer';
import { ICard } from '../../ts/interface/ICard';

class HandHelper {
  static MAX_CARDS_IN_LINE: number = 7;
  private static options: string[] = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];

  public static newHand(draw: ICard[], numberCards: number): ICard[] {
    return draw.splice(0, numberCards);
  }

  public static async showHand(
    player: IPlayer,
    user: User,
    handImages: Buffer[]
  ): Promise<string[]> {
    const { cards, sent } = player.hand;

    const newSent = sent;

    const _sentRequired = Math.ceil(cards.length / this.MAX_CARDS_IN_LINE);
    const sentOverflow = sent.length - _sentRequired;

    const attachments = handImages
      .sort(value => value.length)
      .map(handImage => new MessageAttachment(handImage));

    let numberHand = cards.length;

    const threshold = (numberHand: number) =>
      numberHand > this.MAX_CARDS_IN_LINE ? this.MAX_CARDS_IN_LINE : numberHand;

    for (let [index, messageId] of sent.entries()) {
      user.dmChannel.messages
        .fetch({
          around: messageId,
          limit: 1
        })
        .then(messages => {
          const message = messages.first();

          if (!attachments[index]) {
            //no excesso de mensagens, as exclui
            message?.delete();
          } else {
            //edita as mensagens já existentes e reage
            message?.edit(attachments[index]);

            for (let i = 0; i < threshold(numberHand); i++) {
              message?.react(this.options[index]);
            }

            numberHand -= this.MAX_CARDS_IN_LINE;
          }
        });
    }

    numberHand = cards.length;

    const promises: Promise<Message>[] = [];

    if (sentOverflow < 0) {
      //na falta de mensagens, cria-se novas e reage
      for (let i = 0; i < -sentOverflow; i++) {
        const _promise = user.send(attachments[sent.length + i]);

        _promise.then(message => {
          newSent.push(message.id);

          for (let i = 0; i < threshold(numberHand); i++) {
            message.react(this.options[i]);
          }

          numberHand -= this.MAX_CARDS_IN_LINE;
        });

        promises.push(_promise);
      }
    } else if (sentOverflow > 0) {
      //no excesso de mensagens, remove do array
      for (let i = 0; i < sentOverflow; i++) {
        newSent.pop();
      }
    }

    await Promise.all(promises);

    return newSent;
  }
}

export default HandHelper;
