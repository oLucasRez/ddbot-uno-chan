import { Message } from 'discord.js';

export default abstract class Controller {
  protected PREFIX: string;
  protected DELIMITER: string;

  constructor() {
    this.PREFIX = process.env.PREFIX ?? '';
    this.DELIMITER = process.env.DELIMITER ?? '';
  }

  private _isBotCall(message: Message): boolean {
    const isCallingTheBot = !(
      message.author.bot ||
      message.channel.type === 'dm' ||
      !message.content.startsWith(this.PREFIX)
    );

    return isCallingTheBot;
  }

  private _isUsingCommand(message: Message, command: string): boolean {
    const content = message?.content || '';

    const [, _commandAndArgs] = content.split(this.DELIMITER);

    const [_command] = _commandAndArgs.split(' ');

    return _command === command;
  }

  protected isCallingBotCommand(message: Message, command: string): boolean {
    const isCallingBotCommand =
      message &&
      this._isBotCall(message) &&
      this._isUsingCommand(message, command);

    return isCallingBotCommand;
  }

  protected getCommandArgs(message: Message): string[] {
    const content = message?.content || '';

    const [, _commandAndArgs] = content.split(this.DELIMITER);

    const [, ...args] = _commandAndArgs.split(' ');

    return args;
  }
}
