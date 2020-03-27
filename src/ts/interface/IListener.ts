import { Message, MessageReaction, User } from 'discord.js';

import { SocketEndPoint } from '../enum/SocketEndPoint';

export interface IListener {
  socket: SocketEndPoint;
  function(args: IListenerArgs): void;
}

interface IListenerArgs {
  message?: Message;
  reaction?: MessageReaction;
  user?: User;
}
