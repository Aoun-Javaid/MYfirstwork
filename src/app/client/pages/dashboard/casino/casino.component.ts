import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {


  casinoCards =[
    { imglink:"assets/casino/1.webp",alternate:""},
    { imglink:"assets/casino/2.webp",alternate:""},
    { imglink:"assets/casino/1.webp",alternate:""},
    { imglink:"assets/casino/2.webp",alternate:""},
    { imglink:"assets/casino/1.webp",alternate:""},
    { imglink:"assets/casino/2.webp",alternate:""},
  ]
  listCasino=[
    { name:"Popular",index:1},
    { name:"Teen patti",index:2},
    { name:"lucky7",index:3},
    { name:"Dargon Tiger",index:4},
    { name:"Andar bahar",index:5},
    { name:"Baccarat",index:6},
    { name:"Dargon Tiger",index:7},
    { name:"Andar bahar",index:8},
    { name:"Baccarat",index:9}  
  ]

  isActive : boolean =true;
  step:number=1;
  cliclTab(stepValue:number){
    this.step = stepValue;
    // localStorage.setItem('step', JSON.stringify(this.step));
  }
  constructor() { }

  ngOnInit(): void {
  }

}
