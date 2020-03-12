import Discord from 'discord.js';

import { SocketEndPoint } from '../enum/SocketEndPoint';

export interface IListener {
  socket: SocketEndPoint;
  function(message?: Discord.Message): void;
}
