import jimp from 'jimp';
import path from 'path';

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
}

export default new CardHelper();
