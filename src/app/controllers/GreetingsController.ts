import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import CardHelper from '../helpers/CardHelper';
import Logger from '../../logger';

class GreetingsController extends Controller {
  sayHello: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: message => {
      if (!message || !this.isCallingBotCommand(message, 'konichiwa')) {
        return;
      }

      const phrases = [
        'senpai',
        'kun',
        'san',
        'sama',
        'kouhai',
        'dono',
        'sensei',
        'chibi'
      ];

      message?.channel.send(
        'Hello ' + phrases[Math.floor(Math.random() * phrases.length)] + ' uwu'
      );
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
