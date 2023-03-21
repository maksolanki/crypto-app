import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import { Subject, takeUntil} from "rxjs";



@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit, OnDestroy {
  bannerData: Array<{ image: string, symbol: string, market_cap_change_percentage_24h: number, current_price: number }> = [];
  currency: string = "USD";
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  coinData!: MatTableDataSource<Array<object>>
  filterData: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private readonly ApiService: ApiService,
              private readonly router: Router) {
  }

  private destroySubject: Subject<void> = new Subject();
  getCoinData(): void {
    this.ApiService.getAllData(this.currency).subscribe(allCoinData => {
      takeUntil(this.destroySubject)
      this.coinData = new MatTableDataSource(allCoinData);
      console.log(allCoinData)
      this.coinData.paginator = this.paginator;
    })
    this.ApiService.getTrendingCurrency(this.currency).subscribe(trendingCoinData => {
      takeUntil(this.destroySubject)
      console.log(trendingCoinData)
      this.bannerData = trendingCoinData
    })
  }

  getCurrency(): void {
    if (this.currency == "INR") {
      this.currency = "USD";
    } else {
      this.currency = "INR";
    }
    this.getCoinData();
  }

  ngOnInit():void {
    this.getCoinData()
  }

  getFilteredCoinData():void {
    const filterValue = this.filterData;
    this.coinData.filter = filterValue.trim().toLowerCase();

    if (this.coinData.paginator) {
      this.coinData.paginator.firstPage();
    }
  }

  gotoDetails(allCoinTableRow: { id: string }):void{
    console.log(allCoinTableRow.id)
    this.router.navigate(['coin-detail', allCoinTableRow.id])
  }

  ngOnDestroy():void {
    this.destroySubject.next();
  }
}
