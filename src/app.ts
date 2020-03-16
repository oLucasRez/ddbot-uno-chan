import Discord from 'discord.js';
import mongoose from 'mongoose';

import listeners from './listeners';
import Logger from './logger';

class App {
  private client: Discord.Client;

  private TOKEN: string;
  private CONNECTION_STRING: string;
  private ALTERNATIVE_CONNECTION_STRING: string;

  constructor() {
    this.client = new Discord.Client();

    this.TOKEN = process.env.TOKEN ?? '';
    this.CONNECTION_STRING = process.env.CONNECTION_STRING ?? '';
    this.ALTERNATIVE_CONNECTION_STRING =
      process.env.ALTERNATIVE_CONNECTION_STRING ?? '';

    this._addListeners();
  }

  private _addListeners() {
    listeners.forEach(listener => {
      this.client.addListener(listener.socket, listener.function);
    });
  }

  private async _connectDatabase() {
    Logger.serverLog('opening connection with kawaii-db :3...');

    try {
      await mongoose.connect(this.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      Logger.serverLog('kawaii-db connected and running uwu!');
    } catch {
      Logger.serverLog('kawaii-db not connected :c');
    }
  }

  public async initializeServer() {
    await this._connectDatabase();

    Logger.serverLog('preparing uno-chan (づ｡◕‿‿◕｡)づ...');

    this.client.login(this.TOKEN);
  }
}

export default new App();
