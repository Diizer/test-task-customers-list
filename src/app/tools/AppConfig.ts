import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AppConfig {

    constructor(private readonly http: HttpClient) {
    }

    public loadEnv(): Observable<Env> {
        return of({
            env: environment.env
        });
    }

    public loadConfig(env: any): Observable<AppCfg> {
        return this.http
            .get<AppCfg>('assets/configs/app.' + env.env + '.json?v=' + Date.now())
            .pipe(catchError((er: HttpErrorResponse) => {
                return throwError((er.error && er.error.error) ? er.error.error : 'Server error');
            }));
    }

}

export interface AppCfg {
    apiurl: string;
}

export interface Env {
    env: string;
}
