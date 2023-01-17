import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  slidersImages: any[] = [];
  exchangeNews:any = '';
  isLogin=false;
  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getSlider().subscribe(data => {
      console.log(data.data.slider)
      this.slidersImages = data.data.slider;
    })
    this.getNews();
    this.appService.getLoggedIn().subscribe((res:any)=>{
      this.isLogin=res;
      if(this.isLogin){
        console.log('logintru')
        


      }
    });



  }

  getNews(){
    
    console.log('Innews');
    this.appService.getExchangeNews().subscribe((res:any)=>{
      console.log(res);
      this.exchangeNews=res?.data;
    })
  }

}
