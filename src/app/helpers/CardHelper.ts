import jimp from 'jimp';
import path from 'path';

import { model } from 'mongoose';

import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';
import { ICard } from '../../ts/interface/ICard';
import { UnoNumber } from '../../ts/enum/UnoNumber';
import Card from '../models/Card';

class CardHelper {
  private ASSET_EXTENSION: string;

  constructor() {
    this.ASSET_EXTENSION = '.png';
  }

  private _getAssetPath(assetName: string): string {
    const assetPath = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      `${assetName + this.ASSET_EXTENSION}`
    );

    return assetPath;
  }

  public async loadCard(color: UnoColor, identifier: UnoCard): Promise<Buffer> {
    const colorAssetPath = this._getAssetPath(color);
    const identifierAssetPath = this._getAssetPath(identifier);

    const colorAsset = jimp.read(colorAssetPath);
    const identifierAsset = jimp.read(identifierAssetPath);

    const assets = await Promise.all([colorAsset, identifierAsset]);

    const [colorPart, identifierPart] = assets;

    const card = colorPart.composite(identifierPart, 0, 0);

    return card.getBufferAsync(jimp.MIME_PNG);
  }

  public unoStack(): void {
    const numbers = [
      UnoCard.ZERO,
      UnoCard.ONE,
      UnoCard.TWO,
      UnoCard.THREE,
      UnoCard.FOUR,
      UnoCard.FIVE,
      UnoCard.SIX,
      UnoCard.SEVEN,
      UnoCard.EIGHT,
      UnoCard.NINE,
      UnoCard.BLOCK,
      UnoCard.REVERT,
      UnoCard.PLUS_TWO
    ];
    const blacks = [UnoCard.CHANGE, UnoCard.PLUS_FOUR];
    const colors = [
      UnoColor.BLUE,
      UnoColor.GREEN,
      UnoColor.RED,
      UnoColor.YELLOW
    ];
    const cards: any[] = [];
    numbers.forEach(number => {
      colors.forEach(color => {
        cards.push({ color, identifier: number, number: UnoNumber.ONE });
        if (number !== UnoCard.ZERO)
          cards.push({ color, identifier: number, number: UnoNumber.TWO });
      });
    });
    blacks.forEach(black => {
      cards.push(
        { color: UnoColor.BLACK, identifier: black, number: UnoNumber.ONE },
        { color: UnoColor.BLACK, identifier: black, number: UnoNumber.TWO },
        { color: UnoColor.BLACK, identifier: black, number: UnoNumber.THREE },
        { color: UnoColor.BLACK, identifier: black, number: UnoNumber.FOUR }
      );
    });
    cards.forEach(card => {
      Card.create(card);
    });
    return;
  }
}

export default new CardHelper();
