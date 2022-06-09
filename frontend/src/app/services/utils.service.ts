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

    modifyDateFormat(date: Date | any): string {
        let d: Date = date;
        let year: number = d.getFullYear();

        let month: number = d.getMonth() + 1;
        let finalMonth: string = '';
        month < 10 ? (finalMonth = '0' + month.toString()) : (finalMonth = month.toString());

        let day: number = d.getDate();
        let finalDay: string = '';
        day < 10 ? (finalDay = '0' + day.toString()) : (finalDay = day.toString());

        let hours: number = d.getHours();
        let finalHours: string = '';
        hours < 10 ? (finalHours = '0' + hours.toString()) : (finalHours = hours.toString());

        let minutes: number = d.getMinutes();
        let finalMinutes: string = '';
        minutes < 10 ? (finalMinutes = '0' + minutes.toString()) : (finalMinutes = minutes.toString());

        let seconds: number = d.getSeconds();
        let finalSeconds: string = '';
        seconds < 10 ? (finalSeconds = '0' + seconds.toString()) : (finalSeconds = seconds.toString());

        let fecha: string = year.toString() + '-' + finalMonth + '-' + finalDay;
        return fecha;
    }
}
