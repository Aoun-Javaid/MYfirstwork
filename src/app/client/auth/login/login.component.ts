import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public npasswordType: string="password";

  constructor(private appService: AppService) {

  }
  ngOnInit(): void {
  }

  UserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  //username = new FormControl
  // createForm() {
  //   this.form = this.formBuilder.group({
  //     username: ['', [Validators.required]],
  //     password: ['', [Validators.required]],
  //     platform: ['web'],
  //     systemId: ['', [Validators.required]],
  //     recaptcha: ['']
  //   });

  // ip-config=[{"ip":"54.179.80.60","hostname":"AS16509 Amazon.com, Inc.","city":"Singapore","region":"Central Singapore","country":"Singapore","loc":1.28009,"postal":"048582","org":"AS16509 Amazon.com, Inc."}]
  submitLogin() {
    console.log(this.UserForm.value);;
    this.appService.getIpLocation().subscribe((loc:any) => {
      console.log(loc);
      this.appService.userLogin(this.UserForm.controls['username'].value, this.UserForm.controls['password'].value, JSON.stringify(loc)).subscribe((res: any) => {

      });
    });
  }
}
