import { Schema, model } from 'mongoose';

import { ICardDocument } from '../../ts/interface/ICard';

const CardSchema: Schema = new Schema(
  {
    color: {
      type: String,
      required: true
    },
    identifier: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<ICardDocument>('Card', CardSchema);
