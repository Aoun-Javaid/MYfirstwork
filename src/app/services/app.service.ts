import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }


  getSportsList(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/exchange/sports/sportsList`, {})
  }

  getSlider(): Observable<any> {
    return this.http.post(`${environment.apiV1}/front/slider/getAllSlider`, {})
  }

  getAllEventsList(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/exchange/market/matchodds/allEventsList`, {})
  }

  // getCasinoInfo(): Observable<any> {
  //   return this.http.post(`${environment.apiV1}/front/slider/getAllSlider`, {})
  // }
}
