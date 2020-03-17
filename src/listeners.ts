import { IListener } from './ts/interface/IListener';

import GreetingsController from './app/controllers/GreetingsController';
import GameController from './app/controllers/GameController';
import LikesController from './app/controllers/LikesController';
import CardController from './app/controllers/CardController';

const listeners: IListener[] = [
  GreetingsController.helloToServer,
  GreetingsController.sayHello,
  GameController.startGame,
  LikesController.likes,
  CardController.card
];

export default listeners;
