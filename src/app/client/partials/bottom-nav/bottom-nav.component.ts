import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {
  isRightBarOpen = false;
  customerSuport: any = [];
  isLoggedIn;
  @Output() clickOutside = new EventEmitter<void>();

  
  constructor(private elementRef: ElementRef, private router: Router,private appService: AppService) {
    this.isLoggedIn = localStorage.getItem('accessToken');
  }

  ngOnInit(): void {
    this.getCustomerSupport();

  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isRightBarOpen = false
      this.clickOutside.emit();
    }
    if(target.className=="waves-effect waves-light sideNavCheck" || target.className=="right-side-menu__depositButtons-dep" ||  target.className=="right-side-menu__depositButtons-with" || target.className=="logout")
    {
      this.isRightBarOpen = false

    }

  }


  // showRightNav() {
  //   this.isRightBarOpen = true;
  // }

  sidenavOpen() {
    this.isLoggedIn = localStorage.getItem('accessToken');
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/client/login');
      return;
    } 
    else { 

    if (!this.isRightBarOpen) 
      {
      document.body.className += ' left-bar-enabled';
      this.isRightBarOpen = true;
      } 
      else 
      {
      document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
      this.isRightBarOpen = false;
      }
  }
  }

  getCustomerSupport() {
    this.appService.getCustomerSupport().subscribe(data => {
      if (data.data)
        this.customerSuport = data.data;
    })
  }
}
