import { Injectable } from "@angular/core";
import { API_URL } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { ISchedule, ISchedulePage } from "../model/model.interface";
import { Observable } from "rxjs";


@Injectable()
export class ScheduleService {
    sUrl: string = API_URL + '/schedule';

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<ISchedule> {
        return this.oHttpClient.get<ISchedule>(this.sUrl + '/' + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<ISchedulePage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ISchedulePage>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField);
    }

    getPageByWeekly(size: number | undefined, page: number | undefined, orderField: string, id_weekly: number): Observable<ISchedulePage>{
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ISchedulePage>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField + '&id_weekly=' + id_weekly);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oSchedule: ISchedule): Observable<ISchedule> {
        return this.oHttpClient.post<ISchedule>(this.sUrl, oSchedule);
    }

    updateOne(oSchedule: ISchedule): Observable<ISchedule> {
        return this.oHttpClient.put<ISchedule>(this.sUrl, oSchedule);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + '/empty');
    }
}