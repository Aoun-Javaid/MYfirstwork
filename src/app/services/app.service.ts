import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CONFIG} from "config"
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isLoggedIn= new Subject<boolean>();
  constructor(private http: HttpClient) {
  }
  public getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public setLoggedIn(message: any): void {
    this.isLoggedIn.next(message);
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
    return this.http.post(CONFIG.getCasinoInformation,{});
  }
  getDaysWiseEvents(): Observable<any> {
    return this.http.post(CONFIG.getDaysWiseEvents,{});
  }
  getUserProfile(): Observable<any> {
    return this.http.post(CONFIG.getUserProfile,{});
  }
  userLogin(userName:any,password:any,ip_info:any): Observable<any> {
    return this.http.post(CONFIG.userLogin, {userName,password,ip_info})
  }
  getIpLocation(): Observable<any> {
    return this.http.post(CONFIG.getIpLocation,{})
  }
  // getCasinoInfo(): Observable<any> {
  // getCasinoInformation(): Observable<any> {
  //   // return this.http.post(`${environment.apiUrl}/exchange/market/matchodds/casinoInformation`, {})
  // }
  // /getCasinoInfo(): Observable<any> {
  //   return this.http.post(`${environment.apiV1}/front/slider/getAllSlider`, {})
  // }
  getCustomerSupport(): Observable<any> {
    return this.http.post(CONFIG.getCustomerSupport, {})
  }
}
