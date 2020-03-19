// import { MessageAttachment } from 'discord.js';

// import CardHelper from '../helpers/CardHelper';

// import Controller from '../../ts/abstract/Controller';

// import Game from '../models/Game';

// import { ICard } from '../../ts/interface/ICard';
// import { IListener } from '../../ts/interface/IListener';

// import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
// import GameHelper from '../helpers/GameHelper';
// import HandHelper from '../helpers/HandHelper';

// class HandController extends Controller {
//   getHand: IListener = {
//     socket: SocketEndPoint.MESSAGE,

//     function: async message => {
//       if (!message || !this.isCallingBotCommand(message, 'hand')) return;

//       const game = await GameHelper.getGame(message.channel.id);

//       const hand: ICard[] = HandHelper.newHand(game.draw, 7);

//       const handImages = await CardHelper.loadHand(hand);

//       const attachments = handImages
//         .sort(value => value.length)
//         .map(handImage => new MessageAttachment(handImage));

//       message?.channel.send(`<@${message.author.id}>-senpai hands uwu`);

//       attachments.forEach(attachment => {
//         message?.channel.send(attachment);
//       });
//     }
//   };
// }

// export default new HandController();
