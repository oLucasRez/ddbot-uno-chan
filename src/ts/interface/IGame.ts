import { Document } from 'mongoose';

import { IPlayer } from './IPlayer';
import { ICard } from './ICard';

export interface IGameDocument extends Document {
  players: IPlayer[];
  direction: Number;
  playerTurn: number;
  draw: ICard[];
  table: ICard[];
  channelId: string;
}

export interface IGame {
  players: IPlayer[];
  direction: Number;
  playerTurn: number;
  draw: ICard[];
  table: ICard[];
  channelId: string;
}
