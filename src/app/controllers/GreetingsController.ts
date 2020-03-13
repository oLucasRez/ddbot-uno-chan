import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class GreetingsController extends Controller {
  sayHello: IListener = {
    socket: SocketEndPoint.Message,

    function: message => {
      const rawContent = message?.content;

      const [messagePrefix] = rawContent?.split(this.DELIMITER) || [];

      if (messagePrefix !== this.PREFIX) {
        return;
      }

      message?.channel.send('Hello senpai uwu');
    }
  };

  helloToServer: IListener = {
    socket: SocketEndPoint.Ready,

    function: () => {
      console.log(`A kawaii hello from Uno-chan!`);
    }
  };
}

export default new GreetingsController();
