import { Schema, model } from 'mongoose';

import { IPlayerDocument } from '../../ts/interface/IPlayer';

const PlayerSchema: Schema = new Schema(
  {
    tag: {
      type: String,
      required: true
    },
    hand: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model<IPlayerDocument>('Player', PlayerSchema);
