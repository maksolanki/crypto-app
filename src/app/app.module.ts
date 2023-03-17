import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoinListComponent} from './coin-list/coin-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {CoinDetailComponent} from './coin-detail/coin-detail.component';
import {NgChartsModule} from 'ng2-charts';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HighchartsChartModule} from "highcharts-angular";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent,
    CoinDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    NgChartsModule,
    MatToolbarModule,
    HighchartsChartModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
