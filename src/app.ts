import Discord from 'discord.js';
import mongoose, { mongo } from 'mongoose';

import listeners from './listeners';

class App {
  private client: Discord.Client;

  private TOKEN: string;
  private CONNECTION_STRING: string;

  constructor() {
    this.client = new Discord.Client();

    this.TOKEN = process.env.TOKEN ?? '';
    this.CONNECTION_STRING = process.env.CONNECTION_STRING ?? '';

    this._addListeners();
    this._connectDatabase();
  }

  private _addListeners() {
    listeners.forEach(listener => {
      this.client.addListener(listener.socket, listener.function);
    });
  }

  private _connectDatabase() {
    mongoose.connect(this.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  public initializeServer() {
    this.client.login(this.TOKEN);
  }
}

export default new App();
