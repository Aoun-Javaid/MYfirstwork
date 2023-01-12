import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  slidersImages: any;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getSlider().subscribe(data => {
      console.log(data.slider)
      this.slidersImages = data;
    })
  }

}
