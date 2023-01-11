import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  profileData =
   { joining_date:"2022-11-03 10:41:15",username:"suraj a",name:"suraj",balance:"",expose:"0",mywallet:"1138"}
  
}
