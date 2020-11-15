export class User{
  constructor(public email : string, public id: string, private _token: string, private _tokenExpDate: Date) {}

  get token(){
    return !this._tokenExpDate || new Date() > this._tokenExpDate ? null : this._token;
  }
}
