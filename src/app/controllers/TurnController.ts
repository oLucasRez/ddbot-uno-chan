import Controller from '../../ts/abstract/Controller';
import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class TurnController extends Controller {
  playCard: IListener = {
    socket: SocketEndPoint.REACTION,

    function: async ({ reaction, user }) => {
      if (!reaction || !user) return;

      user.send(
        `${user.username} has added ${reaction.emoji} to the message: ${reaction.message.content}`
      );
    }
  };
}

export default new TurnController();
