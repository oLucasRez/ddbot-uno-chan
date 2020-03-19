import { Schema, model, models } from 'mongoose';

import { IGameDocument } from '../../ts/interface/IGame';

import card from '../../ts/types/Card';
import player from '../../ts/types/Player';

const GameSchema: Schema = new Schema(
  {
    players: [player],
    direction: Number,
    playerTurn: Number,
    draw: [card],
    table: [card],
    channelId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

GameSchema.path('channelId').validate(async (channelId: String) => {
  const gameCount = await models.Game.countDocuments({ channelId });
  return !gameCount;
}, 'Game already exists');

export default model<IGameDocument>('Game', GameSchema);
