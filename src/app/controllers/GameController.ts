import GameHelper from '../helpers/GameHelper';
import Logger from '../../logger';

import CardHelper from '../helpers/CardHelper';

import Controller from '../../ts/abstract/Controller';

import Game from '../models/Game';

import { ICard } from '../../ts/interface/ICard';
import { IListener } from '../../ts/interface/IListener';
import { IGame } from '../../ts/interface/IGame';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class GameController extends Controller {
  startGame: IListener = {
    socket: SocketEndPoint.MESSAGE,
    function: message => {
      if (!message || !this.isCallingBotCommand(message, 'create')) return;

      const { tag } = message.author;
      const { id: channelId } = message.channel;

      const player = GameHelper.createPlayer(tag);

      const deck = CardHelper.createBasicDeck();
      const draw: ICard[] = GameHelper.shuffleDraw(deck);

      const firstCard = draw.pop();
      const table: ICard[] = firstCard ? [firstCard] : [];

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
              `in channel ${channelId}! ( > ω o)`
          );
        })
        .catch(() => {
          Logger.serverLog(
            `Sorry ${player.tag}-kun :c, Uno-chan couldn't ` +
              `create your game in channel ${channelId} >.<`
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
