import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  public pieData: Number[][];
  public labels = [];
  public riskLevel  = 2;
  public riskLevelSubscription: Subscription;
  public dataSubsrciption: Subscription;
  public chartOptions={
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var allData = data.datasets[tooltipItem.datasetIndex].data;
                var tooltipLabel = data.labels[tooltipItem.index];
                var tooltipData = allData[tooltipItem.index];
                var total = 0;
                for (var i in allData) {
                    total += allData[i];
                }
                return tooltipLabel + ': ' + tooltipData + ' USD';
            }
        }
    }
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSubsrciption = this.api.newDataAvailable.subscribe(()=>{
      this.getPieData(this.riskLevel);
      this.getLabels();
    });

    this.riskLevelSubscription = this.api.riskLevel.subscribe((value)=>{    
      this.riskLevel = value-1;
      this.getPieData(this.riskLevel);  
    });
  }

  public getPieData(riskLevel){
    this.pieData = this.api.getDataValues(riskLevel);
  }

  public getLabels(){
    this.labels = this.api.getLabels();
  }

  public selectSlice(event)
  {
    if(event.active[0]!==undefined){
      this.api.activeDataEntry.next(event.active[0]._index);
    }
  }
  
  ngOnDestroy(){
    this.riskLevelSubscription.unsubscribe();
    this.dataSubsrciption.unsubscribe();
  }
}
