import { IPlayer } from '../../ts/interface/IPlayer';
import { ICard } from '../../ts/interface/ICard';
import { IGame, IGameDocument } from '../../ts/interface/IGame';

import Game from '../models/Game';

class GameHelper {
  public static createPlayer(tag: string): IPlayer {
    return { tag, hand: { cards: [], sent: [] } };
  }

  public static shuffleDraw(draw: ICard[]): ICard[] {
    var currentIndex = draw.length,
      tempValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = draw[currentIndex];
      draw[currentIndex] = draw[randomIndex];
      draw[randomIndex] = tempValue;
    }

    return draw;
  }

  public static newHand(draw: ICard[], numberCards: number): ICard[] {
    return draw.splice(0, numberCards);
  }

  public static async getGame(channelId: string): Promise<IGame> {
    return Game.findOne({ channelId })
      .exec()
      .then((value: IGameDocument | null) => {
        if (value) {
          const { players, draw, table, channelId } = value;

          const game = {
            players,
            draw,
            table,
            channelId
          };

          return game;
        } else
          return {
            players: [],
            draw: [],
            table: [],
            channelId: ''
          };
      });
  }
}

export default GameHelper;
