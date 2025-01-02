import { color } from './Utils/types';

class Player {
  
  private readonly _name;
  private _color?: color;

  constructor(name: string, color?: color, ) {
    this._name = name;
    if(color) this._color = color;
  }

  public getName(): string {
    return this._name;
  } 

  public getColor(): string {
    if(this._color) return this._color;
    throw Error('player doesn`t have color');
  } 

  public setColor(color: color) {
    this._color = color;
  }

  public toJSON() {
    return {
      name: this._name,
      color: this._color ? this._color : undefined
    }
  }
}

export default Player;