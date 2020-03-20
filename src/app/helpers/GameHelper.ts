import Game from '../models/Game';

import { ICard } from '../../ts/interface/ICard';
import { IGameDocument } from '../../ts/interface/IGame';

class GameHelper {
  public static async getGame(
    channelId: string
  ): Promise<IGameDocument | null> {
    return await Game.findOne({ channelId }).exec();
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
