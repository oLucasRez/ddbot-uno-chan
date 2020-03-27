import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

class LikesController extends Controller {
  likes: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: ({ message }) => {
      if (!message || !this.isCallingBotCommand(message, 'likes')) {
        return;
      }

      const taggedUser = message?.mentions.users.first();
      var user = 'Ciro Gomes';

      if (!taggedUser) {
        user = message?.member?.user.username ?? 'Ciro Gomes';
      } else {
        user = taggedUser.username;
      }

      message?.channel.send(this.phraseLike(user));
    }
  };

  phraseLike(username: string) {
    const phrases = [
      'ecchi',
      'gore',
      'yaoi',
      'mecha',
      'shounen',
      'bishoujo',
      'shoujo',
      'hentai',
      'isekai',
      'yuri',
      'slice of life',
      'boku no piko'
    ];

    const plus = [
      'likes a lot',
      'really likes',
      'likes',
      "doesn't likes",
      'hates'
    ];

    const randomPlusIndex = Math.floor(Math.random() * plus.length);
    const randomPhraseIndex = Math.floor(Math.random() * phrases.length);

    const randomPhrase = `${username} ${plus[randomPlusIndex]} ${phrases[randomPhraseIndex]} style`;

    return randomPhrase;
  }
}

export default new LikesController();
