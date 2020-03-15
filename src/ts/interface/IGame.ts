import { Document } from 'mongoose';

import { IPlayer } from './IPlayer';
import { ICard } from './ICard';

export interface IGame extends Document {
  players: IPlayer[];
  draw: ICard[];
  table: ICard[];
  channelId: string;
}
