import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-horse-racing',
  templateUrl: './horse-racing.component.html',
  styleUrls: ['./horse-racing.component.css']
})
export class HorseRacingComponent implements OnInit {
  selectedSportId:any;
 
  // catTabs=[
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},
  //   {catName:'djfdsjf',id:'dsadasdsadasd'},

  // ]

  events: any[] = [];
  filteredEvents: any;
  eventsArr: any[] = [];
  markets: any
  catTabs: any[]=[];

  constructor(private appService: AppService,public router:Router) {
  }


  ngOnInit(): void {
    this.getSportsList()
    this.getEventesList()
  }

  getSportsList() {
    debugger
    this.appService.sportTournamentsList({sportId: "7"}).subscribe(data => {
      this.catTabs = data.data;
    })
  }

  getEventesList() {
    this.appService.getAllEventsList().subscribe(data => {
      this.events = data.data
      this.eventsArr = Object.entries(this.events)
      this.categoryType(4)
    })
  }

  categoryType(sportId: any) {
    this.selectedSportId = sportId;
    
    if(this.selectedSportId==66102){

      this.router.navigate(['/client/casinoInternational'])
    }

    if(this.selectedSportId==7){

      this.router.navigate(['/client/horse-racing'])
    }
    this.filteredEvents = this.eventsArr.filter((x: any) => x[1][0]?.sportId == this.selectedSportId)
    this.markets = this.filteredEvents[0][1]
    // assigning filtered events
    // console.log(this.markets, "filtered data");
  }


}
