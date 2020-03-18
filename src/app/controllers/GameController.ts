import GameHelper from '../helpers/GameHelper';
import Logger from '../../logger';

import CardHelper from '../helpers/CardHelper';

import Controller from '../../ts/abstract/Controller';

import Game from '../models/Game';

import { ICard } from '../../ts/interface/ICard';
import { IListener } from '../../ts/interface/IListener';
import { IGame } from '../../ts/interface/IGame';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import HandHelper from '../helpers/HandHelper';

class GameController extends Controller {
  startGame: IListener = {
    socket: SocketEndPoint.MESSAGE,
    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'create')) return;

      const { tag } = message.author;
      const { id: channelId } = message.channel;

      message.author.send("Let's play a new game, onii-chan *‿*");

      const deck = CardHelper.createBasicDeck();
      const draw: ICard[] = GameHelper.shuffleDraw(deck);

      const firstCard = draw.pop();
      const table: ICard[] = firstCard ? [firstCard] : [];

      const player = GameHelper.createPlayer(tag);
      player.hand.cards = GameHelper.newHand(draw, CardHelper.FIRST_HAND);

      player.hand.sent = await HandHelper.showHand(player, message.author);

      const game: IGame = {
        players: [player],
        draw,
        table,
        channelId
      };

      Game.create(game)
        .then(() => {
          Logger.serverLog(
            `New game created by ${player.tag}-kun ` +
              `in channel ${channelId}!`
          );
        })
        .catch(() => {
          Logger.serverError(
            `Sorry ${player.tag}-kun, Uno-chan couldn't ` +
              `create your game in channel ${channelId}`
          );
        });
    }
  };

  enterGame: IListener = {
    socket: SocketEndPoint.MESSAGE,
    function: message => {
      if (!message || !this.isCallingBotCommand(message, 'enter')) return;
    }
  };
}

export default new GameController();
