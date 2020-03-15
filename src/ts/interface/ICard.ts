import { Document } from 'mongoose';

import { UnoCard } from '../enum/UnoCard';
import { UnoColor } from '../enum/UnoColor';

export interface ICardDocument extends Document {
  color: UnoColor;
  identifier: UnoCard;
  number: number;
}

export interface ICard {
  color: UnoColor;
  identifier: UnoCard;
  number: number;
}
