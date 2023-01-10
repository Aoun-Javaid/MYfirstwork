import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {

  constructor() { }
  catTabs=[
    {id:1,cat_name:'cricket',cat_icon:'assets/icons/casino.png'},
    {id:2,cat_name:'football',cat_icon:'assets/icons/football.png'},
    {id:3,cat_name:'tennis',cat_icon:'assets/icons/casino.png'},
    {id:4,cat_name:'casino',cat_icon:'assets/icons/casino.png'},
    {id:5,cat_name:'election',cat_icon:'assets/icons/casino.png'},
  ];
  markets=[
    {
      m_name:'Brisbane Heat v Perth Scorchers',m_subtitle:"Twenty20 Big Bash"
    },
    {
      m_name:'Brisbane Heat v Perth Scorchers',m_subtitle:"Twenty20 Big Bash"
    },
    {
      m_name:'Brisbane Heat v Perth Scorchers',m_subtitle:"Twenty20 Big Bash"
    },
    {
      m_name:'Brisbane Heat v Perth Scorchers',m_subtitle:"Twenty20 Big Bash"
    },
    {
      m_name:'Brisbane Heat v Perth Scorchers',m_subtitle:"Twenty20 Big Bash"
    },
    {
      m_name:'Brisbane Heat v Perth Scorchers',m_subtitle:"Twenty20 Big Bash"
    },
    {
      m_name:'Brisbane Heat v Perth Scorchers',m_subtitle:"Twenty20 Big Bash"
    },

  ]
  ngOnInit(): void {
  }

}
