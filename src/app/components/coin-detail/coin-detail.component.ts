import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router, UrlTree} from "@angular/router";

import * as Highcharts from 'highcharts/highstock';

import HIndicatorsAll from 'highcharts/indicators/indicators-all';
import HDragPanes from 'highcharts/modules/drag-panes';
import HAnnotationsAdvanced from 'highcharts/modules/annotations-advanced';
import HPriceIndicator from 'highcharts/modules/price-indicator';
import HStockTools from 'highcharts/modules/stock-tools';

import {Subject, takeUntil} from "rxjs";

HIndicatorsAll(Highcharts);
HDragPanes(Highcharts);
HAnnotationsAdvanced(Highcharts);
HPriceIndicator(Highcharts);
HStockTools(Highcharts);

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})


export class CoinDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  coin_data: any;
  coin_name: string;
  coin_image: string;
  coinId: number;
  coin_marketCapRank: number;
  coin_currentPrise: number;
  coin_marketCap: number;
  currency: string = "usd";
  currencyPipe: string = "USD";
  chartOptions: Highcharts.Options;
  coin_high_24hs: number;
  coin_low_24hs: number;
  Highcharts: typeof Highcharts = Highcharts;
  width: number;
  private destroySubject: Subject<void> = new Subject();

  constructor(private readonly apiService: ApiService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
  }

  @ViewChild('getDivForWidth')
  getDivForWidth: ElementRef;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(coinIdValue => {
      takeUntil(this.destroySubject)
      this.coinId = coinIdValue['id'];
    });
    this.plotChart();
    this.getCurrencyData();
  }

  plotChart(): void {
    this.chartOptions = {
      chart: {
        backgroundColor: '#F1F5F9',
      },
      plotOptions: {
        candlestick: {
          upColor: "green",
          color: "red"
        },
      },
      series: [
        {
          type: 'candlestick',
          id: "base",
          pointInterval: 24 * 3600 * 1000,
        }
      ]
    }
  }
  ngAfterViewInit(): void {
    this.width = this.getDivForWidth.nativeElement.offsetWidth
    this.chartOptions = {
      chart: {
        width: this.width,
        height: 510
      }
    }
  }
  backToHome(): void {
    this.router.navigate(["coin-list"]);
  }
  getCurrency(): void {
    if (this.currency == "inr") {
      this.currency = "usd";
      this.currencyPipe = "USD";
    } else {
      this.currency = "inr";
      this.currencyPipe = "INR";
    }
    this.getCurrencyData();
  }

  getCurrencyData(): void {
    this.activatedRoute.params.subscribe(coinIdValue => {
      this.coinId = coinIdValue['id'];
    });
    this.apiService.getCurrencyById(this.coinId).subscribe(coin_data_response => {
      takeUntil(this.destroySubject)
      console.log(coin_data_response)
      this.coin_data = coin_data_response;
      this.coin_name = this.coin_data.name;
      this.coin_image = this.coin_data.image.small;
      this.coin_marketCapRank = this.coin_data.market_cap_rank;
      if (this.currency === "usd") {
        this.coin_currentPrise = this.coin_data.market_data.current_price.usd;
        this.coin_marketCap = this.coin_data.market_data.market_cap.usd;
        this.coin_high_24hs = this.coin_data.market_data.high_24h.usd;
        this.coin_low_24hs = this.coin_data.market_data.low_24h.usd
      } else {
        this.coin_currentPrise = this.coin_data.market_data.current_price.inr;
        this.coin_marketCap = this.coin_data.market_data.market_cap.inr;
        this.coin_high_24hs = this.coin_data.market_data.high_24h.inr;
        this.coin_low_24hs = this.coin_data.market_data.low_24h.inr
      }
    })
    this.apiService.getOhlcData(this.coinId, this.currency).subscribe(coin_ohlc_response => {
      takeUntil(this.destroySubject)
      this.coin_data = coin_ohlc_response
      this.chartOptions = {
        series: [
          {
            type: 'candlestick',
            id: "base",
            pointInterval: 24 * 3600 * 1000,
            data: this.coin_data
          }
        ]
      }
    });
  }
  ngOnDestroy(): void {
    this.destroySubject.next();

  }
}
