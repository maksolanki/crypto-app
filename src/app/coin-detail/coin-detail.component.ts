import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../Service/api.service";
import {ActivatedRoute, Router} from "@angular/router";

import * as Highcharts from 'highcharts/highstock';

import HIndicatorsAll from 'highcharts/indicators/indicators-all';
import HDragPanes from 'highcharts/modules/drag-panes';
import HAnnotationsAdvanced from 'highcharts/modules/annotations-advanced';
import HPriceIndicator from 'highcharts/modules/price-indicator';
import HStockTools from 'highcharts/modules/stock-tools';

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
export class CoinDetailComponent implements OnInit, AfterViewInit {
  data;
  name;
  image;
  coinId;
  marketCapRank = 1;
  currentPrise;
  marketCap;
  currency = "usd"
  currencyPipe = "USD"
  chartOptions: Highcharts.Options;
  high_24hs;
  low_24hs;
  Highcharts: typeof Highcharts = Highcharts;
  width

  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  @ViewChild('divEl')
  chartDiv: ElementRef

  ngOnInit() {
    console.log("init")
    this.activatedRoute.params.subscribe(val => {
      this.coinId = val['id'];
    });
    this.ploteChart()
    this.getData()
  }

  ploteChart() {
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

  ngAfterViewInit() {
    this.width = this.chartDiv.nativeElement.offsetWidth
    this.chartOptions = {
      chart: {
        width: this.width,
        height: 510
      }
    }
  }


  home() {
    this.router.navigate(["coin-list"])
  }

  currancy() {
    if (this.currency == "inr") {
      this.currency = "usd";
      this.currencyPipe = "USD"
    } else {
      this.currency = "inr";
      this.currencyPipe = "INR"
    }
    this.getData()
  }

  getData() {
    this.activatedRoute.params.subscribe(val => {
      this.coinId = val['id'];
    });

    this.apiService.getCurrencyById(this.coinId).subscribe(res => {
      console.log(res)
      this.data = res;
      this.name = this.data.name
      this.image = this.data.image.small
      this.marketCapRank = this.data.market_cap_rank;
      if (this.currency === "usd") {
        this.currentPrise = this.data.market_data.current_price.usd;
        this.marketCap = this.data.market_data.market_cap.usd;
        this.high_24hs = this.data.market_data.high_24h.usd;
        this.low_24hs = this.data.market_data.low_24h.usd
        console.log(this.marketCap)
      } else {
        this.currentPrise = this.data.market_data.current_price.inr;
        this.marketCap = this.data.market_data.market_cap.inr;
        this.high_24hs = this.data.market_data.high_24h.inr;
        this.low_24hs = this.data.market_data.low_24h.inr


        console.log(this.marketCap)
      }

    })

    this.apiService.getOhlcData(this.coinId, this.currency).subscribe(res => {
      this.data = res
      this.chartOptions = {

        series: [
          {
            type: 'candlestick',
            id: "base",
            pointInterval: 24 * 3600 * 1000,
            data: this.data
          }
        ]
      }
    })

  }


}
