import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../../services/app.service";

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {
  casinoCards:any=[];
  listCasino:any =[];
  isActive : boolean =true;
  step:any;
  casinoEventsBackup:any;
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.getCasinoInfo();
  }

  getCasinoInfo(){
    this.step="ALL";
    this.appService.getCasinoInformation().subscribe((res:any) =>{
      this.listCasino=res?.data?.casinoTab;
      this.casinoCards=res?.data?.casinoEvents;
      this.casinoEventsBackup=this.casinoCards;
    });
  }
  cliclTab(stepValue:any){
    debugger
    this.step = stepValue;
    if(this.step=="ALL"){
      this.casinoCards = this.casinoEventsBackup;
    }
    else{
      this.casinoCards=this.casinoEventsBackup.filter((data:any) =>{
        if(data.tab==this.step){
          return data;
        }
        // else{
        //   return null;
        // }
    });
    }
   
    // localStorage.setItem('step', JSON.stringify(this.step));
  }
}
