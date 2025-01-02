import { color } from '../../Utils/types';

class PlayersTurnProvider {

  private _colorWithPermission: color;

  constructor() {
    this._colorWithPermission = 'white';
  }

  public getColorWithPermissionToMove = (): color => this._colorWithPermission; 

  public changePermissionToMove = (): void => {
    this._colorWithPermission = this._colorWithPermission === 'white' ? 'black' : 'white'; 
  } 
}

export default PlayersTurnProvider ;