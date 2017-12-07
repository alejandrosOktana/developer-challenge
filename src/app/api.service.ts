import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'
import { HttpClientModule } from '@angular/common/http';


@Injectable()
export class ApiService {

  public riskLevel = new Subject<number>();
  public activeDataEntry = new Subject<number>();
  public newDataAvailable = new Subject<Boolean>();
  public data: any;

  constructor(private http: HttpClient) {
  }

  public loadData(){
    this.http.get('assets/data.json', {
      observe: 'body',
      responseType: 'json'
    }).subscribe( (retrievedData) =>{
      this.data =retrievedData;
      this.newDataAvailable.next(true);
    }, (error) => {
      console.log(error);
    });
    this.riskLevel.next(0);
    this.activeDataEntry.next(undefined);

  }

  public getRiskLevelData(riskLevel){
    return this.data.dataValues[riskLevel-1].map((value) => {
      return {label: this.data.labels, value: value}
    });
  }

  public getDataValues(riskLevel){
    return this.data.dataValues[riskLevel].slice();
  }

  public getLabels(){
    return this.data.labels.slice();
  }

}
