import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPrelogin, IToken, IUser, SessionEvent } from '../model/model.interface';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../environment/environment';
import { UserService } from './user.service';

@Injectable()
export class SessionService {
  
  sUrl: string = API_URL + "/session";

  subjectSession = new Subject<SessionEvent>();

  constructor(
      private oHttpClient: HttpClient,
      private oUserService: UserService
  ) { }

  private parseJwt(token: string): IToken {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
  }

  login(sUsername: string, sPassword: string): Observable<string> {
      return this.oHttpClient.post<string>(`${this.sUrl}/login`, { username: sUsername, password: sPassword });        
  }

  prelogin(): Observable<IPrelogin> {
      return this.oHttpClient.get<IPrelogin>(this.sUrl + "/prelogin");
  }

  loginCaptcha(sUsername: string, sPassword: string, sToken: string, sAnswer: string): Observable<string> {
      return this.oHttpClient.post<string>(this.sUrl + "/loginCaptcha", { username: sUsername, password: sPassword, token: sToken, answer: sAnswer });
  }

  setToken(sToken: string): void {
      localStorage.setItem('token', sToken);        
  }

  getToken(): string | null {
      return localStorage.getItem('token');
  }

  logout(): void {
      localStorage.removeItem('token');        
  }

  isSessionActive(): Boolean {
      let strToken: string | null = localStorage.getItem('token');
      if (strToken) {
          let oDecodedToken: IToken = this.parseJwt(strToken);
          if (Date.now() >= oDecodedToken.exp * 1000) {                
              return false;                
          } else {                
              return true;
          }
      } else {        
          return false;
      }
  }

  getUsername(): string {
      if (this.isSessionActive()) {
          let token: string | null = localStorage.getItem('token');
          if (!token) {
              return "";
          } else {
              return this.parseJwt(token).name;
          }
      } else {
          return "";
      }
  }

  on(): Observable<SessionEvent> {
      return this.subjectSession.asObservable();
  }

  emit(event: SessionEvent) {
      this.subjectSession.next(event);
  }

  getSessionUser(): Observable<IUser> | null {
      if (this.isSessionActive()) {
          return this.oUserService.getByUsername(this.getUsername())
      } else {
          return null;
      }
  }
}
