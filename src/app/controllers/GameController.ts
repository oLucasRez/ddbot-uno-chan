import CardHelper from '../helpers/CardHelper';
import GameHelper from '../helpers/GameHelper';

import Controller from '../../ts/abstract/Controller';
import { ICard } from '../../ts/interface/ICard';
import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { IGame } from '../../ts/interface/IGame';
import Game from '../models/Game';
import Logger from '../../logger';

class GameController extends Controller {
  startGame: IListener = {
    socket: SocketEndPoint.MESSAGE,
    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'create')) return;

      const { tag } = message.author;
      const { id: channelId } = message.channel;

      const player = GameHelper.createPlayer(tag);
      const draw: ICard[] = GameHelper.shuffleDraw(
        CardHelper.createBasicDeck()
      );

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
            `New game created by ${player.tag}-kun in channel ${channelId} desu`
          );
        })
        .catch(() => {
          Logger.serverLog(
            `Could not create the game by ${player.tag}-niichan in channel ${channelId} desu`
          );
        });
    }
  };
}

export default new GameController();
