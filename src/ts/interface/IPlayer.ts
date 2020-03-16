import { Document } from 'mongoose';

import { IGameCardDocument, IGameCard } from './ICard';

export interface IPlayerDocument extends Document {
  tag: string;
  hand: Array<IGameCardDocument[]>;
}

export interface IPlayer {
  tag: string;
  hand: Array<IGameCard[]>;
}
