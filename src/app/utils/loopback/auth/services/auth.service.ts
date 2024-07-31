import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Jwt } from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwt: string | undefined;
  private jwtKeyName: string = btoa('jwt');
  token = new BehaviorSubject<string | undefined>(undefined);
  isAuthenticated = new BehaviorSubject<boolean>(false);
  private user: string | undefined;
  private userKeyName: string = btoa('user');
  userB = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    const jwt = localStorage.getItem(this.jwtKeyName) || undefined;
    if (jwt) {
      this.jwt = atob(jwt);
      this.token.next(this.jwt);
    }

    const user = localStorage.getItem(this.userKeyName) || undefined;
    if (user) {
      this.user = atob(user);
      this.userB.next(this.user);
    }
    this.parseTokenAndEmits();
  }

  setToken(jwt: string) {
    this.jwt = jwt;
    localStorage.setItem(this.jwtKeyName, btoa(this.jwt));
    this.token.next(this.jwt);
    this.parseTokenAndEmits();
  }

  setUser(user: string) {
    this.user = user;
    localStorage.setItem(this.userKeyName, btoa(this.user));
    this.userB.next(this.user);
  }

  cleanToken() {
    localStorage.removeItem(this.jwtKeyName);
    this.jwt = undefined;
    this.token.next(this.jwt);
    localStorage.removeItem(this.userKeyName);
    this.user = undefined;
    this.userB.next(this.user);
    this.parseTokenAndEmits();
  }

  getToken() {
    return this.jwt;
  }

  getUser() {
    return this.user;
  }

  private parseTokenAndEmits() {
    if (!this.jwt) {
      this.isAuthenticated.next(false);
      return;
    }
    const decoded: Jwt = jwtDecode(this.jwt);
    const isAuth: boolean = !!decoded && !!decoded.exp && new Date(decoded.exp * 1000) > new Date();
    this.isAuthenticated.next(isAuth);
  }
}
