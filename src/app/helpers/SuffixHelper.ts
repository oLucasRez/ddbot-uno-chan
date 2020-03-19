import { Suffix } from '../../ts/enum/Suffix';

class SuffixHelper {
  public static randomSuffix(): string {
    const suffixes = Object.values(Suffix);

    return suffixes[Math.floor(Math.random() * suffixes.length)];
  }
}

export default SuffixHelper;
