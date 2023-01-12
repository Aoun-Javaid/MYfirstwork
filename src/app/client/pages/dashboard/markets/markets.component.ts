import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../../services/app.service";

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {
  events: any;

  constructor(private appService: AppService) {
  }

  catTabs: any[] = [];
  markets = [
    {
      m_name: 'Brisbane Heat v Perth Scorchers', m_subtitle: "Twenty20 Big Bash"
    },
    {
      m_name: 'Brisbane Heat v Perth Scorchers', m_subtitle: "Twenty20 Big Bash"
    },
    {
      m_name: 'Brisbane Heat v Perth Scorchers', m_subtitle: "Twenty20 Big Bash"
    },
    {
      m_name: 'Brisbane Heat v Perth Scorchers', m_subtitle: "Twenty20 Big Bash"
    },
    {
      m_name: 'Brisbane Heat v Perth Scorchers', m_subtitle: "Twenty20 Big Bash"
    },
    {
      m_name: 'Brisbane Heat v Perth Scorchers', m_subtitle: "Twenty20 Big Bash"
    },
    {
      m_name: 'Brisbane Heat v Perth Scorchers', m_subtitle: "Twenty20 Big Bash"
    },

  ]

  ngOnInit(): void {
    this.appService.getSportsList().subscribe(data => {
      console.log(data)
      this.catTabs = data.data;
    })
    this.appService.getAllEventsList().subscribe(data => {
      console.log("events:", data)
      this.events = data.data;
    })
  }

  categoryType(categoryObj:any){
      console.log(categoryObj); 
  }

}
