import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CONFIG } from "config"
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';




@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isLoggedIn = new Subject<boolean>();
  public loggedUserData;
  private balance = new Subject<any>();
  constructor(private http: HttpClient, private router: Router, public toastr: ToastrManager,) {
    this.loggedUserData = JSON.parse(localStorage.getItem('loggedUserData'));
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
    return this.http.post(CONFIG.getCasinoInformation, {});
  }
  casinoInternational(): Observable<any> {
    return this.http.post(CONFIG.casinoInternational, {});
  }
  getDaysWiseEvents(): Observable<any> {
    return this.http.post(CONFIG.getDaysWiseEvents, {});
  }
  getUserProfile(): Observable<any> {
    return this.http.post(CONFIG.getUserProfile, {});
  }
  userLogin(userName: any, password: any, ip_info: any): Observable<any> {
    return this.http.post(CONFIG.userLogin, { userName, password, ip_info })
  }
  getIpLocation(): Observable<any> {
    return this.http.post(CONFIG.getIpLocation, {})
  }
  getUserBalance(): Observable<any> {
    return this.http.post(CONFIG.getUserBalance, {})
  }
  changeUserPassword(newPassword: any, oldPassword: any,): Observable<any> {
    return this.http.post(CONFIG.changeUserPassword, { newPassword, oldPassword })
  }
  getUserBetStake(): Observable<any> {
    return this.http.post(CONFIG.getUserBetStake, {})
  }
  updateUserBetStake(stakes: any,): Observable<any> {
    return this.http.post(CONFIG.updateUserBetStake, { stakes })
  }

  getExchangeNews(): Observable<any> {
    return this.http.post(CONFIG.getExchangeNews, {})
  }
  calculateWithdrawalAmount(amount: any,): Observable<any> {
    return this.http.post(CONFIG.calculateWithdrawalAmount, { amount })
  }
  withdrawalRequest(amount: any,): Observable<any> {
    return this.http.post(CONFIG.withdrawalRequest, { amount })
  }
  userAccountStatement(draw: any,): Observable<any> {
    return this.http.post(CONFIG.userAccountStatement, draw)
  }
  userSettledBetList(betlistPayload: any,): Observable<any> {
    return this.http.post(CONFIG.userSettledBetList, betlistPayload)
  }
  userSportsProfitloss(profitLossPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.userSportsProfitloss, profitLossPayLoad)
  }
  getWithdrawalList(): Observable<any> {
    return this.http.post(CONFIG.getWithdrawalList, {})
  }
  deleteWithdrawalBankDetails(id: any,): Observable<any> {
    return this.http.post(CONFIG.deleteWithdrawalBankDetails, { id })
  }
  getWithdrawalBankDetails(): Observable<any> {
    return this.http.post(CONFIG.getWithdrawalBankDetails, {})
  }
  addWithdrawalBank(accountHolderName:any,accountNumber:any,bankName:any,ifsc:any,paymentType:any): Observable<any> {
    return this.http.post(CONFIG.addWithdrawalBank, { accountHolderName,accountNumber,bankName,ifsc,paymentType})
  }
  addWithdrawalUPI_GPAY(gpayName:any,gpayNumber:any,paymentType:any): Observable<any> {
    return this.http.post(CONFIG.addWithdrawalBank, {gpayName,gpayNumber,paymentType })
  }
  addWithdrawalUPI_PAYTM(paytmName:any,paytmNumber:any,paymentType:any): Observable<any> {
    return this.http.post(CONFIG.addWithdrawalBank, {paytmName,paytmNumber,paymentType })
  }
  addWithdrawalUPI_phonepay(phonepeName:any,phonepeNumber:any,paymentType:any): Observable<any> {
    return this.http.post(CONFIG.addWithdrawalBank, {phonepeName,phonepeNumber,paymentType })
  }
  getPasswordHistory(draw:any): Observable<any> {
    return this.http.post(CONFIG.getPasswordHistory, draw)
  }
  getDepositDetails(amount:any): Observable<any> {
    return this.http.post(CONFIG.getDepositDetails,{amount})
  }
  userEventsProfitloss(userEventsProfitLossPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.userEventsProfitloss, userEventsProfitLossPayLoad)
  }
  userMarketsProfitloss(userMarketsProfitLossPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.userMarketsProfitloss, userMarketsProfitLossPayLoad)
  }
  getUserBetList(UserBetProfitLossPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.getUserBetList, UserBetProfitLossPayLoad)
  }

  sportTournamentsList(sportTournamentsListPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.sportTournamentsList, sportTournamentsListPayLoad)
  }

  tournamentEventsList(tournamentEventsPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.tournamentEventsList, tournamentEventsPayLoad)
  }
  

  getRacingEvents(racingEventPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.getRacingEvents, racingEventPayLoad)
  }
  

  getEventMatchedBetList(EventMatchedBetListPayLoad: any,): Observable<any> {
    return this.http.post(CONFIG.getEventMatchedBetList, EventMatchedBetListPayLoad)
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


  getAllRecordsByPost(url, params) {
    return this.http.post<any>(url, params)
      .pipe(map(data => {
        return data;
      }));
  }
  userRegisterOtpSent(mobileNo:any,referralBy:any,userName:any): Observable<any> {
    return this.http.post(CONFIG.userRegisterOtpSent, { mobileNo,referralBy,userName })
  }
  userRegisterVerify(mobileNo:any,referralBy:any,userName:any,password:any,code:any): Observable<any> {
    return this.http.post(CONFIG.userRegisterVerify, { mobileNo,referralBy,userName ,password,code})
  }
  updateRecordByPut(url, params) {
    return this.http.put<any>(url, params)
      .pipe(map(data => {
        return data;
      }));
  }

  getAllRecordsByGet(url, id) {
    return this.http.get<any>(url, { params: id })
      .pipe(map(data => {
        return data;
      }));
  }



  isMultiMarket(eventid) {

    var a;
    var multimarket = localStorage.getItem('multiMarket_' + this.getCurrentUserName())

    if (multimarket) {
      a = JSON.parse(multimarket);
      if (a.includes(eventid)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }

  }

  getCurrentUserName() {
    if (this.loggedUserData) {
      return this.loggedUserData.data.userDetail.username;
    }
  }


  goToLiveCasinoUniverse(eventid, roomid, link) {

    let loggedUserData = JSON.parse(localStorage.getItem('loggedUserData'));
    let token = loggedUserData.data.accessToken;
    let isLiveCasino = loggedUserData.data.userDetail.isLiveCasino;
    if (isLiveCasino) {
      if (link) {
        let isTokenString = link.includes("{$token}");
        if (isTokenString) {
          let finalLinkWithToken = link.replace("{$token}", token);
          this.router.navigate(['/opencasino', finalLinkWithToken]);
          return;
        } else {
          this.router.navigate(['/opencasino', link]);
          return;
        }

      } else {
        let url = 'https://realclub.games//#/authentication/' + token + '/' + eventid + '/' + roomid;
        this.router.navigate(['/opencasino', url]);
        return
      }

    } else {
      this.toastr.errorToastr("Please contact your upline!", '');
      return
    }
  }

  addToMultimarket(eventid) {


    $('.' + eventid).toggleClass('pin-on');
    $('.btn-pin.' + eventid).removeClass('pin-on');

    let newarr;
    var a;
    var multimarket = localStorage.getItem('multiMarket_' + this.getCurrentUserName())

    if (multimarket) {
      a = JSON.parse(multimarket);
      if (a.includes(eventid)) {

        for (var i = 0; i < a.length; i++) {
          if (a[i] === eventid) {
            a.splice(i, 1);
          }
        }

        var json_str = JSON.stringify(a);
        localStorage.setItem('multiMarket_' + this.getCurrentUserName(), json_str);
      } else {
        a.push(eventid)
        var json_str = JSON.stringify(a);
        localStorage.setItem('multiMarket_' + this.getCurrentUserName(), json_str);
      }
    }
    else {
      newarr = [eventid];
      var json_str = JSON.stringify(newarr);
      localStorage.setItem('multiMarket_' + this.getCurrentUserName(), json_str);
    }

  }

  getMultimarketEvents() {
    return JSON.parse(localStorage.getItem('multiMarket_' + this.getCurrentUserName()))
  }

  addToMultimarketInnner(eventid) {

    $('.' + eventid).toggleClass('pin-on-innner');
    let newarr;
    var a;
    var multimarket = localStorage.getItem('multiMarket_' + this.getCurrentUserName())

    if (multimarket) {
      a = JSON.parse(multimarket);
      if (a.includes(eventid)) {

        for (var i = 0; i < a.length; i++) {
          if (a[i] === eventid) {
            a.splice(i, 1);
          }
        }

        var json_str = JSON.stringify(a);
        localStorage.setItem('multiMarket_' + this.getCurrentUserName(), json_str);
      } else {
        a.push(eventid)
        var json_str = JSON.stringify(a);
        localStorage.setItem('multiMarket_' + this.getCurrentUserName(), json_str);
      }
    }
    else {
      newarr = [eventid];
      var json_str = JSON.stringify(newarr);
      localStorage.setItem('multiMarket_' + this.getCurrentUserName(), json_str);
    }
  }

}
