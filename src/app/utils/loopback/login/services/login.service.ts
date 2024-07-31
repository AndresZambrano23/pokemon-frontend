import { Injectable } from '@angular/core';
import { LoopBackService } from '../../base/services/persisted-base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoopBackHttpResponse } from '../../base/models/loopback-http-response';
import { map, catchError, of, tap, Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Login } from '../models/login.model';
import { Response } from '../models/response.model'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends LoopBackService {

  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    protected override http: HttpClient,
    protected override auth: AuthService
  ) {
    super(http, 'users/login', auth)
  }

  login(dataForm: object): Observable<LoopBackHttpResponse<Response>> {
    return this.http.post<LoopBackHttpResponse<Login>>(`${this.getApiEndpoint()}/${this.resource}`, dataForm)
      .pipe(
        tap(res => {
          if (res.data && res.data.token) {
            this.auth.setToken(res.data.token)
            this.user.next(res.data.user)
            this.auth.setUser(res.data.user.email)
          }
        }),
        map(res => {
          return this.formatHttpOkResponse({response: true})
        }),
        catchError((err: HttpErrorResponse) => {
          return of(this.formatHttpErrorResponse(err))
        })
      );
  }

  readMe(): Observable<LoopBackHttpResponse<User>> {
    const data = {
      email: this.auth.getUser()
    }
    return this.http.post<LoopBackHttpResponse<User>>(`${this.getApiEndpoint()}/me`, data)
      .pipe(
        tap(res => {
          if (res.data) {
            this.user.next(res.data)
          }
        })
      )
  }
}
