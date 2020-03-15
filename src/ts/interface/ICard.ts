import { Document } from 'mongoose';

import { UnoCard } from '../enum/UnoCard';
import { UnoColor } from '../enum/UnoColor';

export interface ICard extends Document {
  color: UnoColor;
  identifier: UnoCard;
  number: number;
}
