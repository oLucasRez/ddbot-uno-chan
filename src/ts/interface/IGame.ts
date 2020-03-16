import { Document } from 'mongoose';

import { IPlayerDocument } from './IPlayer';
import { IGameCardDocument, IGameCard } from './ICard';

export interface IGameDocument extends Document {
  players: IPlayerDocument[];
  draw: IGameCardDocument[];
  table: IGameCardDocument[];
  channelId: string;
}

export interface IGame {
  players: IPlayerDocument[];
  draw: IGameCard[];
  table: IGameCard[];
  channelId: string;
}
