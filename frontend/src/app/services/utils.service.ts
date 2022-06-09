import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    constructor() {}

    async executePromise(promise: Promise<any>): Promise<any> {
        try {
            const result = await Promise.all([promise]);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    }
}
