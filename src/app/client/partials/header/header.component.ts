import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSideBarOpen = false;

  onClickedOutside(event: any) {
    if (event.target?.id !== 'toggle-sidemenu') {
      this.isSideBarOpen = false;
      document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
    }
  }

  sidenavOpen() {
    /*$('<div class="modal-backdrop fade show"></div>').appendTo('body');
    $("#" + id).addClass('show');
    $("#" + id).css('display', 'block');*/
    //document.getElementsByTagName('element')[0].classList.remove('d-none');

    // this.isSideBarOpen = !this.isSideBarOpen;
    if (!this.isSideBarOpen) {
      document.body.className += ' left-bar-enabled';
      this.isSideBarOpen = true;
    } else {
      document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
      this.isSideBarOpen = false;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
