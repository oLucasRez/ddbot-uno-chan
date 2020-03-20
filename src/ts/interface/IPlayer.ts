import { ICard } from './ICard';

export interface IPlayer {
  id: string;
  hand: {
    cards: ICard[];
    sent: string[];
  };
}
