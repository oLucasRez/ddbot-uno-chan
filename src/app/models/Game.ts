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
        cardId: {
          type: Schema.Types.ObjectId,
          ref: 'Card'
        },
        cardNumber: {
          type: Number,
          required: true
        }
      }
    ],
    table: [
      {
        cardId: {
          type: Schema.Types.ObjectId,
          ref: 'Card'
        },
        cardNumber: {
          type: Number,
          required: true
        }
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
