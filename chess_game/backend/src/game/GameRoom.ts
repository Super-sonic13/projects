import Player from './Player';
import GameController from './controllers/GameController';


class GameRoom {
  
  private _roomName: string;
  private _player1: Player;
  private _player2?: Player;
  public gameController: GameController;

  constructor(roomName: string, player1: Player) {
    this._roomName = roomName;
    this.gameController = new GameController();
    this._player1 = player1;
  }

  public startGame(player2: Player) {
    this._player2 = player2;
    player2.setColor(this._player1!.getColor() ==='white' ? 'black' : 'white');
    this.gameController.initFigures();
  }

  public getRoomInfo() {
    return {
      room: this._roomName,
      player_1: this._player1 ? this._player1.toJSON() : null,
      player_2: this._player2 ? this._player2.toJSON() : null
    }
  }

}

export default GameRoom;