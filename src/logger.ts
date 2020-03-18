class Logger {
  private static _consoleColors: any = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
  };

  static serverLog(message: string): void {
    const { green, reset } = this._consoleColors;

    console.log(`${green}%s${reset}`, `[server-sama]: ^-^ ${message}`);
  }
  static serverWarn(message: string): void {
    const { yellow, reset } = this._consoleColors;

    console.log(`${yellow}%s${reset}`, `[server-sama]: '•_• ${message}`);
  }
  static serverError(message: string): void {
    const { red, reset } = this._consoleColors;

    console.log(`${red}%s${reset}`, `[server-sama]: x_x ${message}`);
  }
}

export default Logger;
