import { IPlayer } from '../../ts/interface/IPlayer';
import { ICard } from '../../ts/interface/ICard';

class GameHelper {
  public static createPlayer(tag: string): IPlayer {
    return { hand: [], tag };
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
