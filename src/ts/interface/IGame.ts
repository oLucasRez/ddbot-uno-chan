import { Document } from 'mongoose';

import { IPlayer } from './IPlayer';
import { ICard } from './ICard';

export interface IGameDocument extends Document {
  players: IPlayer[];
  draw: ICard[];
  table: ICard[];
  channelId: string;
}

export interface IGame {
  players: IPlayer[];
  draw: ICard[];
  table: ICard[];
  channelId: string;
}
