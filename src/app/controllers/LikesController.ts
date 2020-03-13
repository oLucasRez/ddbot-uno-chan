import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class LikesController extends Controller {
  likes: IListener = {
    socket: SocketEndPoint.Message,

    function: message => {
      const rawContent = message?.content;

      const [messagePrefix, content] = rawContent?.split(this.DELIMITER) || [];

      if (messagePrefix !== this.PREFIX || content !== "likes") {
        return;
      }

      const phrases = [
        "ecchi",
        "gore",
        "yaoi",
        "mecha",
        "shounen",
        "bishoujo",
        "shoujo",
        "hentai",
        "isekai",
        "yuri",
        "slice of life",
        "boku no piko"
      ];
      const plus = [
        "likes a lot",
        "really likes",
        "likes",
        "doesn't likes",
        "hates"
      ];

      const user = message?.member?.user.username;
      
      message?.channel.send(user + " " + plus[Math.floor(Math.random() * plus.length)] + " " + phrases[Math.floor(Math.random() * phrases.length)] + ' style');
    }
  };
}

export default new LikesController();
