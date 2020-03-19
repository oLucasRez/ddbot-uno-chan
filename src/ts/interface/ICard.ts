import { UnoCard } from '../enum/UnoCard';
import { UnoColor } from '../enum/UnoColor';

export interface ICard {
  color: UnoColor;
  identifier: UnoCard;
  number: Number;
}
