import { MessageEmbed, Message } from 'discord.js';

import Controller from '../../ts/abstract/Controller';

import { IListener } from '../../ts/interface/IListener';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';

import GoogleImages from 'image-search-google';

const googleImages = new GoogleImages(
  process.env.GOOGLE_CSE,
  process.env.GOOGLE_KEY
);

class ReactionController extends Controller {
  reaction: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (
        !message ||
        !(message instanceof Message) ||
        !this.isCallingBotCommand(message, 'react')
      )
        return;

      try {
        const results = await googleImages.search('baka', { pages: 1 });

        const reply = !results.length
          ? 'No results'
          : new MessageEmbed()
              .setTitle('Baka!')
              .setDescription('+4 is a baka card! (*￣з￣)')
              .setImage(
                results[Math.floor(Math.random() * results.length)].url
              );

        message.channel.send(reply);
      } catch (error) {
        console.error(error);
        message.channel.send('Something went wrong trying to send a reaction');
      }
    }
  };
}

export default new ReactionController();
