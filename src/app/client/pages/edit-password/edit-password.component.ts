import {Component, OnInit, Injector, ViewChild, ElementRef, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

 
  public opasswordType: string="password";
  public npasswordType: string="password";
  public cpasswordType: string="password";

  
  constructor() { }

  ngOnInit(): void {
  }
  

}
