import Logger from '../../logger';
import Controller from '../../ts/abstract/Controller';

import GameHelper from '../helpers/GameHelper';
import CardHelper from '../helpers/CardHelper';
import EmbedHelper from '../helpers/EmbedHelper';
import SuffixHelper from '../helpers/SuffixHelper';
import PlayerHelper from '../helpers/PlayerHelper';

import Game from '../models/Game';

import { ICard } from '../../ts/interface/ICard';
import { IListener } from '../../ts/interface/IListener';
import { IGame } from '../../ts/interface/IGame';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class GameController extends Controller {
  startGame: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'create')) return;

      const { id: channelId } = message.channel;

      const deck = CardHelper.createBasicDeck();
      const draw: ICard[] = GameHelper.shuffleDraw(deck);

      const _firstCard = draw.pop();
      const table: ICard[] = _firstCard ? [_firstCard] : [];

      const game: IGame = {
        players: [],
        direction: 1,
        playerTurn: 0,
        draw,
        table,
        channelId
      };

      const name = message.member?.nickname ?? message.author.username;

      Game.create(game)
        .then(() => {
          Logger.serverLog(
            `New game created by ${name}-${SuffixHelper.randomSuffix()} ` +
              `in channel ${channelId}!`
          );

          PlayerHelper.enterPlayer(message);
        })
        .catch(() => {
          EmbedHelper.sendError(
            `Uno-chan couldn't create your game in channel ${channelId}`,
            message
          );
          Logger.serverError(
            `Uno-chan couldn't create ${name}-${SuffixHelper.randomSuffix()}'s` +
              ` game in channel ${channelId}`
          );
        });
    }
  };

  enterGame: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'enter')) return;

      PlayerHelper.enterPlayer(message);
    }
  };
}

export default new GameController();
