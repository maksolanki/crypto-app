import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class ApiService {
  constructor(private http: HttpClient) {
  }

  getAllData(currancy) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currancy}&order=market_cap_desc&sparkline=false`)
  }

  getTrendingCurrency(currancy) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currancy}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }

  // getGrpahicalCurrencyData(day , cionID) {
  //   return this.http.get(`https://api.coingecko.com/api/v3/coins/${cionID}/market_chart?vs_currency=INR&days=${day}`)
  // }

  getCurrencyById(coinID){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coinID}`)
  }

  getOhlcData(coinID , currancy){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coinID}/ohlc?vs_currency=${currancy}&days=1`)
  }
}

