import { Document } from 'mongoose';

import { UnoCard } from '../enum/UnoCard';
import { UnoColor } from '../enum/UnoColor';
import { UnoNumber } from '../enum/UnoNumber';

export interface ICard extends Document {
  color: UnoColor;
  identifier: UnoCard;
  number: UnoNumber;
}
