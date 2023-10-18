import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as Plotly from 'plotly.js-dist-min';
import { DataService } from './data-service.service'; // Import your DataService here

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {
  constructor(private http: HttpClient, private dataService: DataService) {
  }
  plotLine(title: string, plotDiv: string, x: string[], y: number[]) {
    // const scaledY = y.map(value => value / 2);
    const colorThreshold = 20; 

    const barColors = y.map(value => (value > colorThreshold) ? 'green' : 'blue');
    const trace = {
      x: y, 
      y: x,
    
      type: 'bar',
      orientation: 'h',
      
      marker: {
        color: barColors,
        width: 0.9
      }
    };
    
    const data: any[] = [trace]; 
    
    const layout = {
      title: title,
      xaxis: { range: [0, 100] },
      shapes: [
        {
          type: 'line',
          x0: 20, 
          x1: 20, 
          y0: 0, 
          y1: 1, 
          xref: 'x',
          yref: 'paper',
          line: {
            color: 'red',
            width: 2 
          }
        }as Plotly.Shape
      ]
      
    };
    
    Plotly.newPlot(plotDiv, data, layout);  

  }

  plotWindRose(title: string, plotDiv: string, data: any[]) {
    const layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 100], 
        },
      },
      showlegend: false,
      title: title,
      bargap: 0.1
      
    };


    Plotly.newPlot(plotDiv, data, layout);
  }


  getData(): Observable<any> {
    return this.http.get('assets/strolls.json');
  }
}
