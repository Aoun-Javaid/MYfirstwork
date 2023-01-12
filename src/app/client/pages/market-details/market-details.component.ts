import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-statement-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.css']
})
export class MarketDetailsComponent implements OnInit {
  islay:boolean=false;
  catTabs=[
    {id:1,cat_name:'All',},
    {id:2,cat_name:'football',},
    {id:3,cat_name:'tennis',},
    {id:4,cat_name:'casino',},
    {id:5,cat_name:'election',},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
