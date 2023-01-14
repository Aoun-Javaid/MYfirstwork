import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public npasswordType: string = "password";

  constructor(private appService: AppService, private router: Router) {

  }
  ngOnInit(): void {
  }

  UserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  staticIpRes = 
    {
      as: '0',
      city: '0',
      country: '0',
      countryCode: '0',
      isp: '0',
      lat: '0',
      lon: '0',
      org: '0',
      query: '0',
      region: '0',
      regionName: '0',
      status: '0',
      timezone: '0',
      zip: '0',
    }
  

  // ip-config=[{"ip":"54.179.80.60","hostname":"AS16509 Amazon.com, Inc.","city":"Singapore","region":"Central Singapore","country":"Singapore","loc":1.28009,"postal":"048582","org":"AS16509 Amazon.com, Inc."}]
  submitLogin(userName?: any, passWord?: any) {
    console.log(this.UserForm.value);;
    let username = userName ? userName : this.UserForm.controls['username'].value;
    let password = passWord ? passWord : this.UserForm.controls['password'].value;
    this.appService.getIpLocation().subscribe((locRes: any) => {
      if(!locRes){
        locRes=this.staticIpRes;
      }
      this.appService.userLogin(username, password, JSON.stringify(locRes)).subscribe((res: any) => {
        if (res.meta.status_code == 200) {
          localStorage.setItem('accessToken', res.data.accessToken);
          this.appService.setLoggedIn(true)
          this.router.navigate(['/client/']);
          // location.reload();
        }
        else {
          this.appService.setLoggedIn(false);
        }
      });
    });
  }
  demoLogin() {
    this.submitLogin('exchange', "Abcd1234");
  }
}
