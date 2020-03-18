import { ICard } from './ICard';

export interface IPlayer {
  tag: string;
  hand: { cards: ICard[]; sent: string[] };
}
