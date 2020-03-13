import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class GreetingsController extends Controller {
  sayHello: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: message => {
      const rawContent = message?.content;

      const [messagePrefix, content] = rawContent?.split(this.DELIMITER) || [];

      if (messagePrefix !== this.PREFIX || content !== 'konichiwa') {
        return;
      }
      const phrases = [
        'senpai',
        'kun',
        'san',
        'sama',
        'kohai',
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
      console.log(`A kawaii hello from Uno-chan!`);
    }
  };
}

export default new GreetingsController();
