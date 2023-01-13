import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  constructor() {

  }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {

  }
}
