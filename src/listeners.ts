import { IListener } from './ts/interface/IListener';

import GreetingsController from './app/controllers/GreetingsController';
import GameController from './app/controllers/GameController';
import LikesController from './app/controllers/LikesController';
import ReactionController from './app/controllers/ReactionController';
import TurnController from './app/controllers/TurnController';

const listeners: IListener[] = [
  GreetingsController.helloToServer,
  GreetingsController.sayHello,
  GameController.createGame,
  GameController.enterGame,
  LikesController.likes,
  ReactionController.reaction
  // TurnController.playCard
];

export default listeners;
