import { Document } from 'mongoose';

import { UnoCard } from '../enum/UnoCard';
import { UnoColor } from '../enum/UnoColor';

export interface ICardDocument extends Document {
  color: UnoColor;
  identifier: UnoCard;
}

export interface ICard {
  color: UnoColor;
  identifier: UnoCard;
}

export interface IGameCardDocument extends Document {
  card: ICard;
  number: Number;
}

export interface IGameCard {
  card: ICard;
  number: Number;
}
