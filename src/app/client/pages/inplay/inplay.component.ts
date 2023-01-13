import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {
  step:number =1;
  constructor() { }

  ngOnInit(): void {
  }

  cliclTab(value:any){
    this.step=value;
    console.log(value);
  }
  
}
