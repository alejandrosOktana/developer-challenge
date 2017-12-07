import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { SliderComponent } from './components/slider/slider.component';
import { ApiService } from './api.service';
import { DataTableComponent } from './components/data-table/data-table.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SliderComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
