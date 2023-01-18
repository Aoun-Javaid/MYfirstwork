import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horse-racing',
  templateUrl: './horse-racing.component.html',
  styleUrls: ['./horse-racing.component.css']
})
export class HorseRacingComponent implements OnInit {
  selectedSportId:any;
  constructor() { }
  catTabs=[
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},
    {catName:'djfdsjf',id:'dsadasdsadasd'},

  ]
  ngOnInit(): void {
  }

}
