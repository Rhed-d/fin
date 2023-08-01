import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const helper = new JwtHelperService();
const TOKEN_KEY = 'access_token';
// tslint:disable-next-line: no-non-null-assertion
const jwt = localStorage.getItem(TOKEN_KEY)!;
const decodedToken = helper.decodeToken(jwt);
const isExpired = helper.isTokenExpired(jwt);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = environment.url;
  token = 'token';
  userInfo: any;
  user!: Observable<any>;
  userData = new BehaviorSubject(null);
  readyStuff!: Observable<any>;
  file!: string | Blob
  formData = new FormData()


  constructor(private Http: HttpClient, private router: Router) {
    this.storedToken();
  }



  // tslint:disable-next-line: typedef
  storedToken() {
    if (jwt) {
      if (!isExpired) {
        this.userInfo = decodedToken;
        this.userData.next(decodedToken);
        return true;
      } else {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
    } else {
      return null;
    }
  }

  register(credentials: any): Observable<any> {
    return this.Http
      .post(`${this.apiBaseUrl}users/register`, credentials).pipe(
        shareReplay(),
        catchError(
          this.errorMgmt
        )
      );
  }

  send_reset_link(email: object): Observable<any> {
    console.log(email)
    return this.Http
      .post(`${this.apiBaseUrl}users/send_reset_mail`, email)
  }

  toFormData(formValue: any) {
    this.formData = new FormData()
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      this.formData.append(key, value);
    }
    this.formData.append('images', this.file)
    console.log(this.formData.get('images'))
    return this.formData
  }


  updatePassword(newPassword: any): Observable<any> {
    return this.Http
      .patch(`${this.apiBaseUrl}users/updatePassword`, newPassword)
  }


  login(credentials: any): Observable<any> {
    return this.Http
      .post(`${this.apiBaseUrl}users/login`, credentials).pipe(
        shareReplay(),
        catchError((e) => {
          window.alert(e.error.message);
          console.log(e.error);
          throw new Error(e);
        })
      );

  }

  adminLogin(credentials: any): Observable<any> {
    return this.Http
      .post(`${this.apiBaseUrl}admin/login`, credentials).pipe(
        shareReplay(),
        catchError((e) => {
          window.alert(e.error.message);
          console.log(e.error);
          throw new Error(e);
        })
      );
  }

  buyCrypto(information: any): Observable<any> {
    console.log(information);
    return this.Http.post(`${this.apiBaseUrl}assets`, information).pipe(
      catchError((e) => {
        window.alert(e.error.message);
        console.log(e.error);
        throw new Error(e);
      })
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

