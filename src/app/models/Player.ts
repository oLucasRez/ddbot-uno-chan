import { Schema, model } from 'mongoose';

import { IPlayerDocument } from '../../ts/interface/IPlayer';

import card from '../../ts/types/Card';

const PlayerSchema: Schema = new Schema(
  {
    tag: {
      type: String,
      required: true
    },
    hand: [card]
  },
  {
    timestamps: true
  }
);

export default model<IPlayerDocument>('Player', PlayerSchema);
