import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {ApiService} from "./api.service";

@Injectable({
  providedIn:"root"
})

export  class CurrencyService{
  constructor(private ApiService: ApiService) {
  }
  currencyChange =new Subject<any>();
  currency
  allDataChange = new Subject()
    getCurrency(currency){
      this.currencyChange.next(currency);
      this.getCoinData();
    }

  getCoinData() {
    this.ApiService.getAllData(this.currency).subscribe(res => {
      this.allDataChange = res
    })
    this.ApiService.getTrendingCurrency(this.currency).subscribe(res => {

    })
  }
}
