import { Message, User, MessageReaction } from 'discord.js';

import { SocketEndPoint } from '../enum/SocketEndPoint';

export interface IListener {
  socket: SocketEndPoint;
  // function(args: IListenerArgs): void;
  function(arg1?: Message | MessageReaction, arg2?: User): void;
  // function(message?: Discord.Message): void;
}

// interface IListenerArgs {
//   message?: Message;
//   reaction?: MessageReaction;
//   user?: User;
// }
