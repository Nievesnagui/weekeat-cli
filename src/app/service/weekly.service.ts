import { Injectable } from "@angular/core";
import { API_URL } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { IWeekly, IWeeklyPage } from "../model/model.interface";

@Injectable({
    providedIn: 'root'
})
export class WeeklyService {

    sUrl: string = API_URL + "/weekly";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IWeekly> {
        return this.oHttpClient.get<IWeekly>(this.sUrl + "/" + id);
    }

    getOneBetweenDates(start: string, end: string, id_user: number): Observable<IWeekly> {
        return this.oHttpClient.get<IWeekly>(this.sUrl + "/betweenDates" + "?start=" + start + "&end=" + end + "&id_user=" + id_user);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<IWeeklyPage> {
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;
     
        return this.oHttpClient.get<IWeeklyPage>(this.sUrl + "?size=" + size + "&page=" + page);
    }

    getPageByUser(size: number | undefined, page: number | undefined, orderField: string, userId:number|undefined): Observable<IWeeklyPage> {
        let sUrl_filter: string;
        size = 2;
        if (!page) page = 0;
        return this.oHttpClient.get<IWeeklyPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField+ "&id_user=" + userId);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
          } else {
            return new Observable<number>();
          }
    }

    newOne(oWeekly: IWeekly): Observable<IWeekly> {
        return this.oHttpClient.post<IWeekly>(this.sUrl, oWeekly);
    }

    updateOne(oWeekly: IWeekly): Observable<IWeekly> {
        return this.oHttpClient.put<IWeekly>(this.sUrl, oWeekly);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }

    private createdWeeklySubject = new BehaviorSubject<number>(0);
    createdWeekly$ = this.createdWeeklySubject.asObservable();
    setCreatedWeekly(weeklyId: number){
        this.createdWeeklySubject.next(weeklyId);
    }
}