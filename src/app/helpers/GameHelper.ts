import { ICard } from '../../ts/interface/ICard';
import Game from '../models/Game';

class GameHelper {
  public static options: string[] = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];

  public static async getGame(channelId: string) {
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
