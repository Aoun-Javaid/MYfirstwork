import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CONFIG} from "config"
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }


  getSportsList(): Observable<any> {
    return this.http.post(CONFIG.getSportsList, {})
  }

  getSlider(): Observable<any> {
    return this.http.post(CONFIG.getSlider, {})
  }

  getAllEventsList(): Observable<any> {
    return this.http.post(CONFIG.getAllEventsList, {})
  }
  getCasinoInformation(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/exchange/market/matchodds/casinoInformation`, {})
  }
  // getCasinoInfo(): Observable<any> {
  //   return this.http.post(`${environment.apiV1}/front/slider/getAllSlider`, {})
  // }
}
