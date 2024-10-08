import { Injectable } from "@angular/core";
import { API_URL } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { ISchedule, ISchedulePage, ISchedulePagePrueba, ISchedulePrueba, IWeekly } from "../model/model.interface";
import { Observable, map } from "rxjs";


@Injectable()
export class ScheduleService {
    sUrl: string = API_URL + '/schedule';

    constructor(
        private oHttpClient: HttpClient
    ) { }
    
    ScheduleService() {
        return this.oHttpClient.get(this.sUrl).pipe(map(response => response, (error: any) => error));
    }

    getOne(id: number): Observable<ISchedulePrueba> {
        return this.oHttpClient.get<ISchedulePrueba>(this.sUrl + '/' + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<ISchedulePrueba> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ISchedulePrueba>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField);
    }

    getPageByWeekly(size: number | undefined, page: number | undefined, orderField: string, id_weekly: number): Observable<ISchedulePagePrueba> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ISchedulePagePrueba>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField + '&id_weekly=' + id_weekly);
    }

    getPageByUser(size: number | undefined, page: number | undefined, orderField: string, id_user: number): Observable<ISchedulePagePrueba> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<ISchedulePagePrueba>(this.sUrl + '/byUser' + '?size=' + size + '&page=' + page + '&sort=' + orderField + '&id_user=' + id_user);
    }

    getPageByWeeklyArr(id_weekly: number): Observable<ISchedulePagePrueba> {
        return this.oHttpClient.get<ISchedulePagePrueba>(this.sUrl + '?size=' + 15 + '&page=' + 0 + '&sort=' + "id" + '&id_weekly=' + id_weekly);
    }

    //Prueba
    getArrayByWeekly(id_weekly: number): Observable<ISchedulePrueba[]> {
        return this.oHttpClient.get<ISchedulePrueba[]>(this.sUrl + '/arrayBySchedule' + '?id_weekly=' + id_weekly);
    }

    getOneByWeeklyAndRecipe(id_weekly: number, id_recipe: number, type: string, day: string): Observable<ISchedulePrueba> {
        return this.oHttpClient.get<ISchedulePrueba>(this.sUrl + '/oneByWeeklyAndRecipe' + '?id_weekly=' + id_weekly + '&id_recipe=' + id_recipe + '&type=' + type + '&day=' + day);
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