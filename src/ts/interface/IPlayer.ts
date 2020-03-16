import { Document } from 'mongoose';

import { ICardDocument, ICard } from './ICard';

export interface IPlayerDocument extends Document {
  tag: string;
  hand: Array<ICardDocument[]>;
}

export interface IPlayer {
  tag: string;
  hand: Array<ICard[]>;
}
