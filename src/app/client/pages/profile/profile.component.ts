import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData:any;
  constructor(private appSevice : AppService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){
    console.log('res profile')
    this.appSevice.getUserProfile().subscribe((res:any)=>{
      
      this.profileData=res.data;
    })
  }
}
