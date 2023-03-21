import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class ApiService {
  constructor(private http: HttpClient) {
  }
  getAllData(currency) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`)
  }
  getTrendingCurrency(currency) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }
  getCurrencyById(coinID){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coinID}`)
  }

  getOhlcData(coinID , currency){
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coinID}/ohlc?vs_currency=${currency}&days=max`)
  }
}

