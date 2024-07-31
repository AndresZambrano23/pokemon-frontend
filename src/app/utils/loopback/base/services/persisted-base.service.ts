import { environment } from '../../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoopBackQuery } from '../models/loopback-query';
import * as qs from 'qs';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoopBackHttpResponse } from '../models/loopback-http-response';
import { AuthService } from '../../auth/services/auth.service';

export class LoopBackService {
  protected baseUrl = environment.backendAPIURL;
  protected prefixUrl = environment.backendAPIPrefix;
  protected resource = 'content';
  protected http: HttpClient;
  protected auth: AuthService;

  constructor(http: HttpClient, resourceName: string, auth: AuthService) {
    this.http = http;
    this.resource = resourceName;
    this.auth = auth;
  }

  protected getApiEndpoint(): string {
    return (this.prefixUrl) ? `${this.baseUrl}/${this.prefixUrl}` : this.baseUrl;
  }

  protected _find<T>(query?: LoopBackQuery): Observable<LoopBackHttpResponse<T>> {
    return this.http.get<T>(`${this.getApiEndpoint()}/${this.resource}${this.buildQueryString(query)}`,
      {
        headers: this.getHeaders(),
      })
      .pipe(
        map(res => {
          return this.formatHttpOkResponse<T>(res);
        }),
        catchError((err:HttpErrorResponse) => {
          return of(this.formatHttpErrorResponse(err));
        }),
      );
  }

  protected _findById<T>(id: string | number, query?: LoopBackQuery): Observable<LoopBackHttpResponse<T>> {
    return this.http.get<T>(`${this.getApiEndpoint()}/${this.resource}/${String(id)}${this.buildQueryString(query)}`,
      {
        headers: this.getHeaders(),
      })
      .pipe(
        map(res => {
          return this.formatHttpOkResponse<T>(res);
        }),
        catchError((err:HttpErrorResponse) => {
          return of(this.formatHttpErrorResponse(err));
        }),
      );
  }

  protected _findOne<T>(id: string | number, query?: LoopBackQuery): Observable<LoopBackHttpResponse<T>> {
    return this.http.get<T>(`${this.getApiEndpoint()}/${this.resource}/${String(id)}${this.buildQueryString(query)}`,
      {
        headers: this.getHeaders(),
      })
      .pipe(
        map(res => {
          return this.formatHttpOkResponse<T>(res);
        }),
        catchError((err:HttpErrorResponse) => {
          return of(this.formatHttpErrorResponse(err));
        }),
      );
  }

  count(query?: LoopBackQuery): Observable<LoopBackHttpResponse<number>> {
    return this.http.get(`${this.getApiEndpoint()}/${this.resource}/count${this.buildQueryString(query)}`,
      {
        headers: this.getHeaders(),
      })
      .pipe(
        map(res => {
          return this.formatHttpOkResponse<number>(Number(res));
        }),
        catchError((err:HttpErrorResponse) => {
          return of(this.formatHttpErrorResponse(err));
        }),
      );
  }

  protected getHeaders(): HttpHeaders | undefined {
    return undefined;
  }

  protected buildQueryString(query?: LoopBackQuery): string {
    if (!query) {
      return '';
    }
    const strapiQuery = {
      _where: query.where || undefined,
      _sort: query.sort || undefined,
      _limit: query.limit || undefined,
      _start: query.start || undefined,
      _locale: query.locale || undefined,
    };

    const q = qs.stringify(strapiQuery);
    return q && q.length ? `?${q}` : '';
  }

  protected formatHttpErrorResponse(err: HttpErrorResponse) {
    return {
      err: {
        error: err.error,
        message: err.message,
        name: err.name,
        code: err.status,
      },
      data: null,
    };
  }

  protected formatHttpOkResponse<T>(data: T): LoopBackHttpResponse<T> {
    return {
      err: null,
      data: data,
    };
  }
}
