import Controller from '../../ts/abstract/Controller';
import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { MessageReaction } from 'discord.js';

class TurnController extends Controller {
  playCard: IListener = {
    socket: SocketEndPoint.REACTION,

    function: async (reaction, user) => {
      if (!reaction || !(reaction instanceof MessageReaction) || !user) return;
    }
  };
}

export default new TurnController();
