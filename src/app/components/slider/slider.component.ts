import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  public currentRiskLevel = 1
  constructor(private api: ApiService) { }

  public inputHandler(event){
    this.api.riskLevel.next(event.target.valueAsNumber);
    this.currentRiskLevel = event.target.valueAsNumber;
  }
}
