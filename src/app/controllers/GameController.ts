import { Message, Client, User } from 'discord.js';

import Controller from '../../ts/abstract/Controller';

import Logger from '../../logger';

import GameHelper from '../helpers/GameHelper';
import CardHelper from '../helpers/CardHelper';
import PlayerHelper from '../helpers/PlayerHelper';
import HandHelper from '../helpers/HandHelper';

import { ICard } from '../../ts/interface/ICard';
import { IListener } from '../../ts/interface/IListener';
import { IGame, IGameDocument } from '../../ts/interface/IGame';
import { IPlayer } from '../../ts/interface/IPlayer';

import { SocketEndPoint } from '../../ts/enum/SocketEndPoint';
import { Response } from '../../ts/enum/Response';

class GameController extends Controller {
  createGame: IListener = {
    socket: SocketEndPoint.MESSAGE,

    function: async message => {
      if (!message || !this.isCallingBotCommand(message, 'create')) return;

      const { author } = message;
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

      GameHelper.createGame(game)
        .then(async gameDocument => {
          Logger.serverLog(
            `New game created by ${name}-${Logger.randomSuffix()} ` +
              `in channel ${channelId}!`
          );

          this._initializeUserInGame(author, gameDocument, name);
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

      const { author } = message;
      const { id: channelId } = message.channel;

      const game = await GameHelper.getGame(channelId);

      if (!game) {
        Logger.serverError(`Game not created`);
        return;
      }

      const name = message.member?.nickname ?? message.author.username;

      this._initializeUserInGame(author, game, name);
    }
  };

  private async _initializeUserInGame(
    user: User,
    game: IGameDocument,
    name: string
  ) {
    const player = PlayerHelper.createEmptyPlayer(user.id);

    const hand = HandHelper.newHand(game.draw, CardHelper.FIRST_HAND);
    player.hand.cards = hand;

    const response = await this._putPlayerInGame(player, game);

    switch (response) {
      case Response.PLAYER_ALREADY_CREATED:
        Logger.serverWarn(
          `${name}-${Logger.randomSuffix()} is already in the game`
        );
        break;

      case Response.SUCCESS:
        Logger.serverLog(
          `${name}-${Logger.randomSuffix()} entered in the game`
        );

        const hand = HandHelper.newHand(game.draw, CardHelper.FIRST_HAND);
        const handImages = await CardHelper.loadHand(hand);

        const newSent = await HandHelper.showHand(player, user, handImages);

        PlayerHelper.updatePlayerSentMessages(player, newSent);
        break;
    }
  }

  private async _putPlayerInGame(player: IPlayer, game: IGameDocument) {
    const response = await PlayerHelper.enterPlayer(game, player);

    return response;
  }
}

export default new GameController();
