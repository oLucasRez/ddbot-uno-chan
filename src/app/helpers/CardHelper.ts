import { UnoColor } from '../../ts/enum/UnoColor';
import { UnoCard } from '../../ts/enum/UnoCard';

class CardHelper {
  private ASSETS_PATH: string;
  private ASSET_EXTENSION: string;

  constructor() {
    this.ASSET_EXTENSION = '.png';
    this.ASSETS_PATH = '../../assets';
  }

  private getAssetPath(assetName: string): string {
    const assetPath = `${this.ASSETS_PATH}/${assetName + this.ASSET_EXTENSION}`;
    return assetPath;
  }

  public loadCard(color: UnoColor, identifier: UnoCard): string {
    const colorAssetPath = this.getAssetPath(color);
    const identifierAssetPath = this.getAssetPath(identifier);

    return '';
  }
}

export default new CardHelper();
