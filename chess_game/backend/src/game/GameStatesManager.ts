import GameRoom from './GameRoom';
import Player from './Player';

class GameStatesManager {

  public static states = new Map<string, GameRoom>();

  public static createNewGameState(room: string, player: Player): void {
    const gamesState = new GameRoom(room, player);
    this.states.set(room, gamesState);
  }

  public static isStateExist(room: string): boolean {
    if(this.states.has(room)) return true;
    return false;
  }

  public static getGameStateByRoom(room: string): GameRoom {
    return this.states.get(room) as GameRoom;
  }

}

export default GameStatesManager;