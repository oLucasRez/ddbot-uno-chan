import { Message } from 'discord.js';
import Controller from '../../ts/abstract/Controller';

import Game from '../models/Game';

import Logger from '../../logger';

import GameHelper from '../helpers/GameHelper';
import CardHelper from '../helpers/CardHelper';
import PlayerHelper from '../helpers/PlayerHelper';
import HandHelper from '../helpers/HandHelper';

import { ICard } from '../../ts/interface/ICard';
import { IListener } from '../../ts/interface/IListener';
import { IGame } from '../../ts/interface/IGame';
import { IPlayer } from '../../ts/interface/IPlayer';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { Response } from '../../ts/enum/Response';

class GameController extends Controller {
  createGame: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'create')) return;

      const { id: channelId } = message.channel;

      const deck = CardHelper.createBasicDeck();
      const draw: ICard[] = GameHelper.shuffleDraw(deck);

      const _firstCard = draw.pop();
      const table: ICard[] = _firstCard ? [_firstCard] : [];

      const game: IGame = {
        players: [],
        direction: 1,
        playerTurn: 0,
        draw,
        table,
        channelId
      };

      const name = message.member?.nickname ?? message.author.username;

      Game.create(game)
        .then(() => {
          Logger.serverLog(
            `New game created by ${name}-${Logger.randomSuffix()} ` +
              `in channel ${channelId}!`
          );

          this._enterPlayer(message);
        })
        .catch(() => {
          Logger.serverError(
            `Uno-chan couldn't create ${name}-${Logger.randomSuffix()}'s` +
              ` game in channel ${channelId}`
          );
        });
    }
  };

  enterGame: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'enter')) return;

      this._enterPlayer(message);
    }
  };

  private async _enterPlayer(message: Message) {
    const { channel, author: user } = message;

    const game = await GameHelper.getGame(channel.id);
    if (!game) {
      Logger.serverError(`Game not created in channel ${channel.id}`);
    } else {
      const hand = HandHelper.newHand(game.draw, CardHelper.FIRST_HAND);
      const handImages = await CardHelper.loadHand(hand);

      const player: IPlayer = PlayerHelper.createEmptyPlayer(user.id);

      player.hand.cards = hand;

      const name = message.member?.nickname ?? message.author.username;

      switch (await PlayerHelper.enterPlayer(game, player)) {
        case Response.GAME_NOT_CREATED:
          Logger.serverError(`Game not created`);
          break;
        case Response.PLAYER_ALREADY_CREATED:
          Logger.serverWarn(`${name} is already in the game`);
          break;
        case Response.SUCCESS:
          Logger.serverLog(`${name} entered in the game`);
          await HandHelper.showHand(player, user, game, handImages);
          break;
      }
    }
  }
}

export default new GameController();
