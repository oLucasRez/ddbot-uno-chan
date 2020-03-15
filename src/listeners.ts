import { IListener } from './ts/interface/IListener';

import GreetingsController from './app/controllers/GreetingsController';
import LikesController from './app/controllers/LikesController';
import CardController from './app/controllers/CardController';

const listeners: IListener[] = [
  GreetingsController.helloToServer,
  GreetingsController.sayHello,
  LikesController.likes,
  CardController.card
];

export default listeners;
