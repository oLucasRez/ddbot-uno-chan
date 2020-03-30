import Game from '../models/Game';

import { ICard } from '../../ts/interface/ICard';
import { IGameDocument, IGame } from '../../ts/interface/IGame';

class GameHelper {
  public static async getGame(
    channelId: string
  ): Promise<IGameDocument | null> {
    return await Game.findOne({ channelId }).exec();
  }

  public static async getGameByUserId(userId: string) {
    var game = Game.findOne({
      players: {
        $elemMatch: { id: userId }
      }
    });

    return await game.exec();
  }

  public static async createGame(game: IGame): Promise<IGameDocument> {
    return Game.create(game);
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
}

export default GameHelper;
