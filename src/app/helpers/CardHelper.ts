import jimp from 'jimp';
import path from 'path';

import { ICard } from '../../ts/interface/ICard';

import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';

class CardHelper {
  private ASSET_EXTENSION: string;
  private MAX_CARDS_IN_LINE: number;
  private HAND_WIDTH: number;

  constructor() {
    this.ASSET_EXTENSION = '.png';
    this.MAX_CARDS_IN_LINE = 7;
    this.HAND_WIDTH = this.MAX_CARDS_IN_LINE * 50 + 100;
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

  public async loadCard({ color, identifier }: ICard) {
    const colorAssetPath = this._getAssetPath(color);
    const identifierAssetPath = this._getAssetPath(identifier);

    const colorAsset = jimp.read(colorAssetPath);
    const identifierAsset = jimp.read(identifierAssetPath);

    const assets = await Promise.all([colorAsset, identifierAsset]);

    const [colorPart, identifierPart] = assets;

    const card = colorPart.composite(identifierPart, 0, 0);

    return card;
  }

  public async loadHand(hand: ICard[]): Promise<Buffer[]> {
    let handImage = new jimp(this.HAND_WIDTH, 220);
    const handImages: jimp[] = [];

    for (let i = 0; i < hand.length; i++) {
      const moduleByMaxCardsInLine = i % this.MAX_CARDS_IN_LINE;

      const hasLoadedMaxCards = i !== 0 && moduleByMaxCardsInLine === 0;
      const isLastIteration = i === hand.length - 1;

      if (hasLoadedMaxCards) {
        handImages.push(handImage);

        handImage = new jimp(this.HAND_WIDTH, 220);
      }

      const card = await this.loadCard(hand[i]);
      handImage = handImage.blit(card, moduleByMaxCardsInLine * 50, 0);

      if (isLastIteration) {
        handImages.push(handImage);
      }
    }

    const handImagesBuffer = Promise.all(
      handImages.map(image => image.getBufferAsync(jimp.MIME_PNG))
    );

    return handImagesBuffer;
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
