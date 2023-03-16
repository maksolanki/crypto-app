import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../Service/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  bannerData: any = [];
  currency: string = "USD";
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ApiService: ApiService,
              private router: Router) {
  }

  getCoinData(){
    this.ApiService.getAllData(this.currency).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
    this.ApiService.getTrendingCurrency(this.currency).subscribe(res => {
      this.bannerData = res
    })
  }

  currancy() {
    if (this.currency == "INR") {
      this.currency = "USD";
    } else {
      this.currency = "INR";
    }
    this.getCoinData();
  }

  ngOnInit() {
   this.getCoinData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: any) {
    this.router.navigate(['coin-detail', row.id])
  }
}
