import { Schema, model } from 'mongoose';

import { IGameDocument } from '../../ts/interface/IGame';

const GameSchema: Schema = new Schema(
  {
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player'
      }
    ],
    draw: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card'
      }
    ],
    table: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card'
      }
    ],
    channelId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model<IGameDocument>('Game', GameSchema);
