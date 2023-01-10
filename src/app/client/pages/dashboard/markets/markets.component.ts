import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {

  constructor() { }
  catTabs=[
    {id:1,cat_name:'cricket',cat_icon:'assets/icons/casino'},
    {id:2,cat_name:'football',cat_icon:'assets/icons/casino'},
    {id:3,cat_name:'tennis',cat_icon:'assets/icons/casino'},
    {id:4,cat_name:'casino',cat_icon:'assets/icons/casino'},
    {id:5,cat_name:'election',cat_icon:'assets/icons/casino'},
    {id:1,cat_name:'cricket',cat_icon:'assets/icons/casino'},
    {id:2,cat_name:'football',cat_icon:'assets/icons/casino'},
    {id:3,cat_name:'tennis',cat_icon:'assets/icons/casino'},
    {id:4,cat_name:'casino',cat_icon:'assets/icons/casino'},
    {id:5,cat_name:'election',cat_icon:'assets/icons/casino'},
  ]
  ngOnInit(): void {
  }

}
