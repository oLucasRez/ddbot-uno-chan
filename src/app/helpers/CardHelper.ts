import jimp from 'jimp';
import path from 'path';

import { ICard } from '../../ts/interface/ICard';

import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';

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

  public isSpecialCard(identifier: UnoCard): boolean {
    const isSpecialCard =
      identifier === UnoCard.CHANGE || identifier === UnoCard.PLUS_FOUR;

    return isSpecialCard;
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

  public createBasicDeck(): ICard[] {
    let deck: ICard[] = [];

    Object.values(UnoCard).forEach(identifier => {
      Object.values(UnoColor).forEach(color => {
        const cards: ICard[] = [];

        const isSpecialCard = this.isSpecialCard(identifier);

        if (
          (isSpecialCard && color === UnoColor.BLACK) ||
          (!isSpecialCard && color !== UnoColor.BLACK)
        ) {
          const numberOfCards =
            identifier === UnoCard.ZERO ? 1 : isSpecialCard ? 4 : 2;

          for (let i = 0; i < numberOfCards; i++) {
            cards.push({
              color,
              identifier,
              number: i + 1
            });
          }
        }

        deck = deck.concat(cards);
      });
    });

    return deck;
  }
}

export default new CardHelper();
