import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AppService} from "../../../../services/app.service";

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {
  events: any[] = [];
  selectedSportId: any;
  filteredEvents: any;
  eventsArr: any[] = [];
  catTabs: any[] = [];
  markets: any

  constructor(private appService: AppService,public router:Router) {
  }


  ngOnInit(): void {
    this.getSportsList()
    this.getEventesList()
  }

  getSportsList() {
    this.appService.getSportsList().subscribe(data => {
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
