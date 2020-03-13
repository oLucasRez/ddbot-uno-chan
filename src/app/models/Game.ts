import { Schema, model } from 'mongoose';

import { IGame } from '../../ts/interface/IGame';

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
    channelId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model<IGame>('Game', GameSchema);
