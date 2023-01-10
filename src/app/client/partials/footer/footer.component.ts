import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  socialmedia=[
    { imglink:"assets/footer/facebook.png",alternate:""},
    { imglink:"assets/footer/twitter.png",alternate:""},
    { imglink:"assets/footer/telegram.png",alternate:""},
    { imglink:"assets/footer/instagram.png",alternate:""},
  ]
  paymentMethods =[
    { imglink:"assets/footer/GPay.png",alternate:""},
    { imglink:"assets/footer/BankTranfer.png",alternate:""},
    { imglink:"assets/footer/PhonePe.png",alternate:""},
    { imglink:"assets/footer/UPI.png",alternate:""},
    { imglink:"assets/footer/Paytm.png",alternate:""},
    { imglink:"assets/footer/Astropay.png",alternate:""},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
