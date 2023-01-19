import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.css']
})
export class RightNavComponent implements OnInit {
  userbalance:any;
  constructor(private route :Router,private appservice :AppService) { }

  ngOnInit(
  ): void {
    this.userbalance=this.appservice.getUserData();
  }
  logout(){
      localStorage.clear();
      this.route.navigate(['/client']);
      this.appservice.setLoggedIn(false);
  }

}
