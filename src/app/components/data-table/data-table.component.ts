import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  public currentLevelData = undefined;
  public activeDataEntry = undefined;
  public currentRiskLevel = 1;
  private riskLevelSubscription: Subscription;
  private activeDataEntrySubscription: Subscription;
  public dataSubsrciption: Subscription;
  
  constructor(private api: ApiService) { }

  
  ngOnInit() {
    this.dataSubsrciption = this.api.newDataAvailable.subscribe(()=>{
      this.currentLevelData = this.api.getRiskLevelData(this.currentRiskLevel);
    })
    this.riskLevelSubscription = this.api.riskLevel.subscribe((value) => {
      this.currentRiskLevel = value;
      this.currentLevelData = this.api.getRiskLevelData(value);
    });
    this.activeDataEntry = this.api.activeDataEntry.subscribe((value)=>{
      this.activeDataEntry = value;
    });
  }

  ngOnDestroy(){
    this.riskLevelSubscription.unsubscribe();
    this.api.activeDataEntry.unsubscribe();
    this.dataSubsrciption.unsubscribe();
  }

}
