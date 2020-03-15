import jimp from 'jimp';
import path from 'path';

import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';
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
        cards.push({ color, identifier: number, number: 1 });
        if (number !== UnoCard.ZERO)
          cards.push({ color, identifier: number, number: 2 });
      });
    });
    blacks.forEach(black => {
      cards.push(
        { color: UnoColor.BLACK, identifier: black, number: 1 },
        { color: UnoColor.BLACK, identifier: black, number: 2 },
        { color: UnoColor.BLACK, identifier: black, number: 3 },
        { color: UnoColor.BLACK, identifier: black, number: 4 }
      );
    });
    cards.forEach(card => {
      Card.create(card);
    });
    return;
  }
}

export default new CardHelper();
