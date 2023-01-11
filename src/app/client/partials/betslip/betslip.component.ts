import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {
  @Input() islay:any;
  constructor() { }

  ngOnInit(): void {
  }

}
