import Discord from 'discord.js';

import listeners from './listeners';

class App {
  private client: Discord.Client;

  private TOKEN: string;

  constructor() {
    this.client = new Discord.Client();

    this.TOKEN = process.env.TOKEN ?? '';

    this._addListeners();
  }

  private _addListeners() {
    listeners.forEach(listener => {
      this.client.addListener(listener.socket, listener.function);
    });
  }

  public initializeServer() {
    this.client.login(this.TOKEN);
  }
}

export default new App();
