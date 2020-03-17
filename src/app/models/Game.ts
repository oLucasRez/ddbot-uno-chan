import { Schema, model } from 'mongoose';

import { IGameDocument } from '../../ts/interface/IGame';

import card from '../../ts/types/Card';
import player from '../../ts/types/Player';

const GameSchema: Schema = new Schema(
  {
    players: [player],
    draw: [card],
    table: [card],
    channelId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model<IGameDocument>('Game', GameSchema);
