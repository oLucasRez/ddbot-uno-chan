import { Schema, model } from 'mongoose';

import { IGameDocument } from '../../ts/interface/IGame';

import card from '../../ts/types/Card';

const GameSchema: Schema = new Schema(
  {
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player'
      }
    ],
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
