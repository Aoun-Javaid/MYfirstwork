import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  stakes:any =[];
  constructor(private appService:AppService) { }

  ngOnInit(): void {
      this.getcurrentStakes();
  }
  getcurrentStakes(){
    this.appService.getUserBetStake().subscribe((res:any)=>{
      this.stakes=res.data.stake;
    })
  }
  updatestakes(){
    this.appService.updateUserBetStake(JSON.stringify(this.stakes)).subscribe((res:any)=>{
        console.log(res.data);
    });
  }
}
