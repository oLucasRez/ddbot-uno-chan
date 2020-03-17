import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';
import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class LikesController extends Controller {
  likes: IListener = {
    socket: SocketEndPoint.Message,

    function: message => {
      const rawContent = message?.content;

      const [messagePrefix, content] = rawContent?.split(this.DELIMITER) || [];

      if (messagePrefix !== this.PREFIX || !content.startsWith("likes")) {
        return;
      }

      const taggedUser = message?.mentions.users.first();
      var user = "Ciro Gomes";

      if(!taggedUser) {
        user = message?.member?.user.username ?? "Ciro Gomes";
      } else {
        user = taggedUser.username;
      }
      message?.channel.send(this.phraseLike(user));
    }
  };

  phraseLike (username: string) {
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
    return (username + " " + plus[Math.floor(Math.random() * plus.length)] + " " + phrases[Math.floor(Math.random() * phrases.length)] + ' style');
  }
}

export default new LikesController();
