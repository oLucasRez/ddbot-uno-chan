export default abstract class Controller {
  protected PREFIX: string;
  protected DELIMITER: string;

  constructor() {
    this.PREFIX = process.env.PREFIX ?? '';
    this.DELIMITER = process.env.DELIMITER ?? '';
  }
}
