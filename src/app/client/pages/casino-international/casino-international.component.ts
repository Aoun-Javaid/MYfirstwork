import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-casino-international',
  templateUrl: './casino-international.component.html',
  styleUrls: ['./casino-international.component.css']
})
export class CasinoInternationalComponent implements OnInit {
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
    debugger
    this.step="ALL";
    this.appService.casinoInternational().subscribe((res:any) =>{
    
      this.listCasino=res?.data?.casinoTab;
      this.casinoCards=res?.data?.casinoEvents;
      this.casinoEventsBackup=this.casinoCards;
    });
    console.log(this.casinoCards);
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
    });
    }
   
    // localStorage.setItem('step', JSON.stringify(this.step));
  }


}
