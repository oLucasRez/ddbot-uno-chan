import { Document } from 'mongoose';

import { ICardDocument, ICard } from './ICard';

export interface IPlayerDocument extends Document {
  tag: string;
  hand: ICardDocument[];
}

export interface IPlayer {
  tag: string;
  hand: ICard[];
}
