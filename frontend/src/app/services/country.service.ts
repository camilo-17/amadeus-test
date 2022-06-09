import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
        Authorization: '',
        'Access-Control-Allow-Origin': '*',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    constructor(private http: HttpClient) {}

    getCountries() {
        return this.createGetRequest('v2', 'all', 'fields=name');
    }

    private createGetRequest(apiVersion: string, operation: string, payload: any = null): Observable<any> {
        let base;
        let finalEndpoint = `${environment.restCountries}/${apiVersion}`;
        if (operation) {
            finalEndpoint = `${finalEndpoint}/${operation}`;
        }
        if (payload) {
            finalEndpoint = `${finalEndpoint}?${payload}`;
        }
        base = this.http.get(finalEndpoint, httpOptions);

        const request = base.pipe(catchError(this.handleError));
        return request;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
            return throwError('Something bad happened; please try again later.');
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
            return throwError({ status: error.status, body: JSON.stringify(error.error) });
        }
    }
}
