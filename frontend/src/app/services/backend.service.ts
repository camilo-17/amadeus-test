import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../components/table/table-datasource';

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
export class BackendService {
    constructor(private http: HttpClient) {}

    getCustomers() {
        return this.createGetRequest('User');
    }

    saveCustomer(user: User) {
        return this.createPostRequest('User', user);
    }

    deleteCustomer(userId: Number) {
        return this.createDeleteRequest('User', userId);
    }

    updateCustomer(user: User) {
        const { userId } = user;
        return this.createPutRequest('User', user, userId);
    }

    private createGetRequest(operation: string, payload: any = null): Observable<any> {
        let base;
        let finalEndpoint = `${environment.backend}/${operation}`;

        if (payload) {
            finalEndpoint = `${finalEndpoint}?${payload}`;
        }
        base = this.http.get(finalEndpoint, httpOptions);

        const request = base.pipe(catchError(this.handleError));
        return request;
    }
    private createDeleteRequest(operation: string, payload: any = null): Observable<any> {
        let base;
        let finalEndpoint = `${environment.backend}/${operation}`;

        if (payload) {
            finalEndpoint = `${finalEndpoint}/${payload}`;
        }
        base = this.http.delete(finalEndpoint, httpOptions);

        const request = base.pipe(catchError(this.handleError));
        return request;
    }

    private createPostRequest(operation: string, body: User): Observable<any> {
        let base;
        let finalEndpoint = `${environment.backend}/${operation}`;

        base = this.http.post(finalEndpoint, body, httpOptions);

        const request = base.pipe(catchError(this.handleError));
        return request;
    }

    private createPutRequest(operation: string, body: User, id: any): Observable<any> {
        let base;
        let finalEndpoint = `${environment.backend}/${operation}/${id}`;

        base = this.http.put(finalEndpoint, body, httpOptions);

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
