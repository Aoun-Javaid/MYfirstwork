import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor( private formBuilder: FormBuilder) { 
    
  }
  ngOnInit(): void {
  }

  form = new FormGroup({
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
  submitLogin(){
    console.log(this.form.value)
  }
}
