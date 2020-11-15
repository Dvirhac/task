import {Injectable} from "@angular/core";
import {BehaviorSubject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {User} from "../user";
import {Router} from "@angular/router";

export interface AuthResponseData{
  idToken:	string;
  email: string;
  refreshToken:	string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({providedIn: "root"})
export class AuthService{
  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsgqTe4u8dvn31u0a8vRjXXOLqReWCfF4';
  private signInApi = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsgqTe4u8dvn31u0a8vRjXXOLqReWCfF4';
  private tokenExpTimer : any;
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) {}
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this._handleError), tap(resData => {
        this.handleAuth(resData.email,
          resData.localId,
          resData.idToken,
          + resData.expiresIn);
      })
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signInApi, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this._handleError), tap(resData => {
      this.handleAuth(resData.email,
        resData.localId,
        resData.idToken,
        + resData.expiresIn);
    }));
  }

  autoLogin (){
    const userData : {
      email: string,
      id: string,
      _token: string,
      _tokenExpDate: Date
    } =JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpDate));
    if (loadUser.token){
      this.user.next(loadUser);
    }
    const expirationDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  private handleAuth(email: string, localId: string, idToken: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,localId,idToken, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn* 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


  private _handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error Occurred!';
    if (!errorRes.error || !errorRes.error.error)
    {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message)
    {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists, please login';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Email address is not valid ';
        break;
    }
    console.log(errorRes);
    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer){
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(exp: number){
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, exp)
  }
}
