import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Plotly from 'plotly.js-dist-min';

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {
  plotLine(title: string, plotDiv: string, x: string[], y: number[], colors: string[]) {
    const scaledY = y.map(value => value / 2);
    const trace = {
      x: scaledY, 
      y: x,
    
      type: 'bar',
      orientation: 'h',
      marker: {
        color: colors,
        width: 0.1
      }
    };
    
    const data: any[] = [trace]; 
    
    const layout = {
      title: title
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

  
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('assets/strolls.json');
  }
}
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import * as d3 from 'd3';

// @Injectable({
//   providedIn: 'root'
// })
// export class D3Service {
//   createHorizontalBarChart(title: string, container: string, x: string[], y: (number | undefined)[], colors: string[]) {
//     const scaledY: number[] = y.map(value => (value !== undefined ? value / 2 : 0));

//     const svg = d3.select(container);

//     const barHeight = 30;
//     const barWidthScale = d3.scaleLinear()
//       .domain([0, d3.max(scaledY) as number])
//       .range([0, 400]); // Adjust the range as needed

//     svg.attr('width', 600)
//       .attr('height', x.length * barHeight);

//     const bar = svg.selectAll('g')
//       .data(scaledY)
//       .enter().append('g')
//       .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

//     bar.append('rect')
//       .attr('width', d => barWidthScale(d))
//       .attr('height', barHeight - 1)
//       .attr('fill', (d, i) => colors[i]);

//     bar.append('text')
//       .attr('x', d => +barWidthScale(d) - 3)
//       .attr('y', barHeight / 2)
//       .attr('dy', '.35em')
//       .text((d, i) => x[i]);

//     svg.append('text')
//       .attr('x', +svg.attr('width') / 2)
//       .attr('y', barHeight * (x.length + 1))
//       .attr('text-anchor', 'middle')
//       .text(title);
//   }

//   constructor(private http: HttpClient) { }

//   getData(): Observable<any> {
//     return this.http.get('assets/strolls.json');
//   }
// }
