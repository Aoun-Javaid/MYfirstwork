import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {
  isRightBarOpen = false;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    document.body.className = document.body.className.replace(/left-bar-enabled/g, '').trim();
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isRightBarOpen = false
      this.clickOutside.emit();
    }
  }


  showRightNav() {
    this.isRightBarOpen = true;
  }
}
