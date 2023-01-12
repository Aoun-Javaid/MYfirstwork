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
}
