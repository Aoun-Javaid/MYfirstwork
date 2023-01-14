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
  private balance = new Subject<any>();
  constructor(private http: HttpClient) {

  }
  public getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public setLoggedIn(message: any): void {
    this.isLoggedIn.next(message);
  }
  public getbalance(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }

  public setbalance(message: any): void {
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
  getUserBalance(): Observable<any> {
    return this.http.post(CONFIG.getUserBalance, {})
  }
  changeUserPassword(newPassword:any,oldPassword:any,): Observable<any> {
    return this.http.post(CONFIG.changeUserPassword, {newPassword,oldPassword})
  }
  getUserBetStake(): Observable<any> {
    return this.http.post(CONFIG.getUserBetStake, {})
  }
  updateUserBetStake(stakes:any,): Observable<any> {
    return this.http.post(CONFIG.updateUserBetStake, {stakes})
  }

  getExchangeNews(): Observable<any> {
    return this.http.post(CONFIG.getExchangeNews, {})
  }
  calculateWithdrawalAmount(amount:any,): Observable<any> {
    return this.http.post(CONFIG.calculateWithdrawalAmount, {amount})
  }
  withdrawalRequest(amount:any,): Observable<any> {
    return this.http.post(CONFIG.withdrawalRequest, {amount})
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
