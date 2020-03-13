import { IListener } from './ts/interface/IListener';

import GreetingsController from './app/controllers/GreetingsController';
import LikesController from './app/controllers/LikesController';
import TestController from './app/controllers/CardController';

const listeners: IListener[] = [
  GreetingsController.helloToServer,
  GreetingsController.sayHello,
  LikesController.likes,
  TestController.card
];

export default listeners;
