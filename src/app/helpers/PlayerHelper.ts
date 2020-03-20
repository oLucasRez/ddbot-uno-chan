import { User, Message } from 'discord.js';

import app from '../../app';
import Logger from '../../logger';

import EmbedHelper from './EmbedHelper';
import CardHelper from './CardHelper';
import HandHelper from './HandHelper';
import GameHelper from './GameHelper';

import Game from '../models/Game';

import { IPlayer } from '../../ts/interface/IPlayer';

class PlayerHelper {
  private static _createPlayer(id: string): IPlayer {
    return { id, hand: { cards: [], sent: [] } };
  }

  public static getUser(id: string): Promise<User> {
    return app.client.users.fetch(id);
  }

  public static async enterPlayer(message: Message) {
    const { channel, author, member } = message;
    const { id } = author;
    const { id: channelId } = channel;

    const name = member?.nickname ?? author.username;

    const game = await GameHelper.getGame(channelId);

    if (game?.players.find(player => player.id === id)) {
      Logger.serverError(`${name} is already in the game`);

      EmbedHelper.sendError(
        'You cannot enter the game twice, you are already in the game',
        message
      );
    } else if (game) {
      const player = this._createPlayer(author.id);

      EmbedHelper.sendHello(message.author);

      await Game.updateOne(
        { channelId },
        { $push: { players: player } },
        error => {
          if (error) {
            Logger.serverError(`Cannot enter ${name} in the game`);
          } else {
            Logger.serverLog(`${name} successfully entered the game`);
          }
        }
      );

      EmbedHelper.sendTable(message);

      player.hand.cards = HandHelper.newHand(game?.draw, CardHelper.FIRST_HAND);
      player.hand.sent = await HandHelper.showHand(player);
    } else {
      Logger.serverError('Game not created yet');
    }
  }
}

export default PlayerHelper;
