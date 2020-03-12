import { IListener } from './ts/interface/IListener';

import GreetingsController from './app/controllers/GreetingsController';

const listeners: IListener[] = [
  GreetingsController.helloToServer,
  GreetingsController.sayHello
];

export default listeners;
