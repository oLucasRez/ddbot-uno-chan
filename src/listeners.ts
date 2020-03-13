import { IListener } from './ts/interface/IListener';

import GreetingsController from './app/controllers/GreetingsController';
import LikesController from './app/controllers/LikesController';

const listeners: IListener[] = [
  GreetingsController.helloToServer,
  GreetingsController.sayHello,
  LikesController.likes
];

export default listeners;
