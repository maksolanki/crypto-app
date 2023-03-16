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
export class CoinDetailComponent implements OnInit ,AfterViewInit{
  data;
  name;
  image;
  coinId;
  discription;
  marketCapRank;
  currentPrise;
  marketCap;
  currency = "inr"
  currencyPipe = "INR"
  chartOptions: Highcharts.Options;

  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  Highcharts: typeof Highcharts = Highcharts;
  width = "40%"

  @ViewChild('chartDiv')
  chartDiv:ElementRef

  ngOnInit() {

    this.activatedRoute.params.subscribe(val => {
      this.coinId = val['id'];
    });
    this.getData()
  }
  ngAfterViewInit() {
    let width = this.chartDiv.nativeElement.offsetWidth
    let Height = this.chartDiv.nativeElement.offsetHeight
    console.log(width , Height)
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
      this.discription = this.data.description.en.split('. ')[0]
      this.image = this.data.image.large
      this.marketCapRank = this.data.market_cap_rank;
      if (this.currency === "usd") {
        this.currentPrise = this.data.market_data.current_price.usd;
        this.marketCap = this.data.market_data.market_cap.usd;
        console.log(this.marketCap)
      }else {
        this.currentPrise = this.data.market_data.current_price.inr;
        this.marketCap = this.data.market_data.market_cap.inr;
        console.log(this.marketCap)
      }

    })

    this.apiService.getOhlcData(this.coinId, this.currency).subscribe(res => {
      this.data = res
      this.chartOptions = {

        chart: {
          width: 800,
          height: 650,
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
            data: this.data
          }
        ]
      }
      // console.log(this.data)
    })

  }


}
