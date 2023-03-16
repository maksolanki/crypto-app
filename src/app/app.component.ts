import {Component, OnInit} from '@angular/core';
import {ApiService} from "./Service/api.service";
import {CurrencyService} from "./Service/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crypto-app';
  currency: string = "USD";

  constructor(private ApiService: ApiService,
              private CurrencyService: CurrencyService) {
  }

  ngOnInit() {

  }

  currancy() {
    if (this.currency == "INR") {
      this.currency = "USD";
    } else {
      this.currency = "INR";
    }
    this.CurrencyService.getCurrency(this.currency)
  }


}
