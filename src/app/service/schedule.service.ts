import { Injectable } from "@angular/core";
import { API_URL } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { ISchedule, ISchedulePage, ISchedulePagePrueba, ISchedulePrueba } from "../model/model.interface";
import { Observable } from "rxjs";


@Injectable()
export class ScheduleService {
    sUrl: string = API_URL + '/schedule';

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<ISchedulePrueba> {
        return this.oHttpClient.get<ISchedulePrueba>(this.sUrl + '/' + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<ISchedulePrueba> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ISchedulePrueba>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField);
    }

    getPageByWeekly(size: number | undefined, page: number | undefined, orderField: string, id_weekly: number): Observable<ISchedulePagePrueba>{
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ISchedulePagePrueba>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField + '&id_weekly=' + id_weekly);
    }

    getPageByWeeklyArr(id_weekly: number): Observable<ISchedulePagePrueba>{
        return this.oHttpClient.get<ISchedulePagePrueba>(this.sUrl + '?size=' + 15 + '&page=' + 0 + '&sort=' + "id" + '&id_weekly=' + id_weekly);
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