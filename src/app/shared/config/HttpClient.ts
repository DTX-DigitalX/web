import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './../services/login.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';

const TIMEOUT = 5000;

@Injectable()
export class HttpClient {

    constructor(
        private http: Http,
        private authService: LoginService
    ) { }

    private createRequestOptions() {
        const headerToken = 'Bearer ' + this.authService.token.access_token;
        return new RequestOptions({ headers: new Headers({ 'Authorization': headerToken }) });
    }

    get(url, paramsRequest?: Object) {
        let params = new URLSearchParams();
        // tslint:disable-next-line:forin
        for (const param in paramsRequest) {
            params.set(param, paramsRequest[param]);
        }

        const requestOptions = this.createRequestOptions();
        requestOptions.search = params;

        return this.http.get(url, requestOptions)
            .timeout(TIMEOUT)
            .catch((error: any) => {
                if (error.status === 401) {
                    console.log('sem acesso');
                    this.authService.logout();
                    return Observable.throw('Acesso Expirou!');
                }

                return Observable.throw(error);
            });
    }

    post(url, data) {
        return this.http.post(url, data, this.createRequestOptions())
            .timeout(TIMEOUT)
            .catch((error: any) => {
                if (error.status === 401) {
                    console.log('sem acesso');
                    this.authService.logout();
                    return Observable.throw('Acesso Expirou!');
                }

                return Observable.throw(error);
            });
    }

    put(url, data) {
        return this.http.put(url, data, this.createRequestOptions())
            .timeout(TIMEOUT)
            .catch((error: any) => {
                if (error.status === 401) {
                    console.log('sem acesso');
                    this.authService.logout();
                    return Observable.throw('Acesso Expirou!');
                }

                return Observable.throw(error);
            });
    }
}
