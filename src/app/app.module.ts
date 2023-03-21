import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoinListComponent} from './components/coin-list/coin-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {CoinDetailComponent} from './components/coin-detail/coin-detail.component';
import {NgChartsModule} from 'ng2-charts';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HighchartsChartModule} from "highcharts-angular";
import {MatButtonModule} from "@angular/material/button";
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import {LoaderService} from "./services/loader.service";
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent,
    CoinDetailComponent,
    MyLoaderComponent,
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
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule

  ],
  providers: [ LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass:LoaderInterceptorService , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
