import Logger from '../../logger';

import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { Message } from 'discord.js';
// import SuffixHelper from '../helpers/SuffixHelper';

class GreetingsController extends Controller {
  sayHello: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: message => {
      if (
        !message ||
        !(message instanceof Message) ||
        !this.isCallingBotCommand(message, 'konichiwa')
      )
        return;

      // message?.channel.send('Hello -' + SuffixHelper.randomSuffix() + ' uwu');
    }
  };

  helloToServer: IListener = {
    socket: SocketEndPoint.READY,

    function: () => {
      Logger.serverLog(`A kawaii hello from Uno-chan!`);
    }
  };
}

export default new GreetingsController();
