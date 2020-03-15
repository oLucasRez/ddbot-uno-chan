import { Document } from 'mongoose';

import { IPlayerDocument } from './IPlayer';
import { ICardDocument, ICard } from './ICard';

export interface IGameDocument extends Document {
  players: IPlayerDocument[];
  draw: ICardDocument[];
  table: ICardDocument[];
  channelId: string;
}

export interface IGame {
  players: IPlayerDocument[];
  draw: ICard[];
  table: ICard[];
  channelId: string;
}
