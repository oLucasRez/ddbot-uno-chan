import { Document } from 'mongoose';

import { ICard } from './ICard';

export interface IPlayer extends Document {
  tag: string;
  hand: ICard[];
}
