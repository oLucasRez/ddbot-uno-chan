// import { MessageAttachment } from 'discord.js';

// import CardHelper from '../helpers/CardHelper';

// import Controller from '../../ts/abstract/Controller';

// import Game from '../models/Game';

// import { ICard } from '../../ts/interface/ICard';
// import { IListener } from '../../ts/interface/IListener';

// import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
// import GameHelper from '../helpers/GameHelper';
// import HandHelper from '../helpers/HandHelper';

// class CardController extends Controller {
//   card: IListener = {
//     socket: SocketEndPoint.MESSAGE,

//     function: async message => {
//       if (!message || !this.isCallingBotCommand(message, 'loadHand')) {
//         return;
//       }
//       const game = await GameHelper.getGame(message.channel.id);
//       const hand: ICard[] = HandHelper.newHand(game.draw, 9);
//       const handImages = await CardHelper.loadHand(hand);
//       const attachments = handImages
//         .sort(value => value.length)
//         .map(handImage => new MessageAttachment(handImage));
//       message?.channel.send(`<@${message.author.id}>-senpai hands uwu`);
//       const options = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];
//       attachments.forEach(async attachment => {
//         const sent = await message?.channel.send(attachment);
//         options.forEach(option => {
//           sent.react(option);
//         });
//       });
//     }
//   };
// }

// export default new CardController();
