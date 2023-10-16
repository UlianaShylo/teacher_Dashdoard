import { Component, OnInit } from '@angular/core';
import { PlotlyService} from '../plotly.service';

@Component({
  selector: 'app-plotly-component',
  templateUrl: './plotly-component.component.html',
  styleUrls: ['./plotly-component.component.css']
})
export class PlotlyComponent implements OnInit {
  skillsData: any[] | undefined; 
  domainDataMap: Map<string, any[]> = new Map();

  constructor(private plot: PlotlyService) { 
    this.domainDataMap = new Map();
  }

  ngOnInit(): void {
    
    this.plot.getData().subscribe((data) => {
      if (Array.isArray(data)) {
        this.skillsData = data;

        this.skillsData.forEach((skill) => {
          const domain = skill.domain;
          if (!this.domainDataMap.has(domain)) {
            this.domainDataMap.set(domain, []);
          }
          for (const chapterKey in skill.chapters) {
            if (skill.chapters.hasOwnProperty(chapterKey)) {
              const chapter = skill.chapters[chapterKey];
              const chapterData = {
                chapter_id: chapterKey,
                success: chapter.success,
                ignorance_rate: chapter.ignorance_rate,
              };
             
              if (this.domainDataMap!.has(domain)) {
                this.domainDataMap!.get(domain)!.push(chapterData);
              }
            }
          }
          
        });

        const domainAverages = new Map<string, number>();

          for (const [domain, chapters] of this.domainDataMap) {
            const totalIgnorance = chapters.reduce((sum, chapter) => sum + chapter.ignorance_rate, 0);
            let averageIgnorance = totalIgnorance / chapters.length;
            if (Number.isNaN(averageIgnorance)){
              averageIgnorance = 0;
            }
            domainAverages.set(domain, averageIgnorance);
          }
        const colors = ['blue', 'green', 'red', 'purple'];
        console.log(domainAverages);
        this.plot.plotLine("Line Plot", "plot", Array.from(domainAverages.keys()), Array.from(domainAverages.values()), colors);

        const windRoseData = [{
          type: 'scatterpolar',
          r: Array.from(domainAverages.values()),  
          theta: Array.from(domainAverages.keys()), 
          fill: 'toself',
          name: 'Domain Averages',  
        }];

          this.plot.plotWindRose('Wind Rose Chart', 'wind-rose-plot', windRoseData)
      }
    });
    
  }
}
// import { Component, OnInit,  ElementRef } from '@angular/core';
// import { D3Service } from '../plotly.service';

// @Component({
//   selector: 'app-plotly-component',
//   templateUrl: './plotly-component.component.html',
//   styleUrls: ['./plotly-component.component.css']
// })
// export class PlotlyComponent implements OnInit{
//   skillsData: any[] | undefined;
//   domainDataMap: Map<string, any[]> = new Map();
//   isDataProcessed: boolean = false;

//   constructor(private plot: D3Service, private elementRef: ElementRef) {
//     this.domainDataMap = new Map();
//   }
  

//   ngOnInit(): void {
//     this.plot.getData().subscribe((data) => {
//       if (Array.isArray(data)) {
//         this.skillsData = data;
//         this.processData(this.skillsData).then(() => {
//           this.isDataProcessed = true;
//         });
//       }
//     });
//   }
//   processData(data: any[]) {
//     data.forEach((skill) => {
//       const domain = skill.domain;
//       if (!this.domainDataMap.has(domain)) {
//         this.domainDataMap.set(domain, []);
//       }
//       for (const chapterKey in skill.chapters) {
//         if (skill.chapters.hasOwnProperty(chapterKey)) {
//           const chapter = skill.chapters[chapterKey];
//           const chapterData = {
//             chapter_id: chapterKey,
//             success: chapter.success,
//             ignorance_rate: chapter.ignorance_rate,
//           };
  
//           // Use the 'get' method to retrieve the array for the domain
//           const domainArray = this.domainDataMap.get(domain);
//           if (domainArray) {
//             domainArray.push(chapterData);
//           }
//         }
//       }
      
//     });
  
  
  
//     // Add some console.log statements to debug the data and map
//     console.log('Processed data:', data);
//     console.log('Domain Data Map:', this.domainDataMap);
//   }
//   ngAfterViewInit(): void {
//     // Check if the data is ready
//     console.log(this.isDataProcessed);
//     if (this.isDataProcessed)  {
//       const plotContainer = this.elementRef.nativeElement.querySelector('#plot');
  
//       if (plotContainer) {
//         const xValues = Array.from(this.domainDataMap.keys());
//         const yValues = xValues.map((domain) => {
//           const domainData = this.domainDataMap.get(domain);
//           if (domainData) {
//             // Sum up the 'ignorance_rate' values for the domain
//             return domainData.reduce((sum, chapterData) => sum + chapterData.ignorance_rate, 0);
//           } else {
//             return 0; // Handle empty domains by providing a default value
//           }
//         });
//         console.log(xValues);
  
//         const colors = this.getColors(); // Call your function to generate colors
  
//         this.plot.createHorizontalBarChart(
//           'Line Plot',
//           plotContainer,
//           xValues,
//           yValues,
//           colors
//         );
//       }
//     }
//   }

//   getColors(): string[] {
//     // Example function to generate colors based on data
//     return ['blue', 'green', 'red', 'purple'];
//   }
// }

// ngOnInit(): void {
//   this.plot.getData().subscribe((data) => {
//     if (Array.isArray(data)) {
//       this.skillsData = data;
//       this.processData(this.skillsData, () => {
//         this.isDataProcessed = true;
//         this.processDataCompleted();
//       });
//     }
//   });
// }

// processData(data: any[], callback: () => void) {
//   data.forEach((skill) => {
//     const domain = skill.domain;
//           if (!this.domainDataMap.has(domain)) {
//             this.domainDataMap.set(domain, []);
//           }
//           for (const chapterKey in skill.chapters) {
//             if (skill.chapters.hasOwnProperty(chapterKey)) {
//               const chapter = skill.chapters[chapterKey];
//               const chapterData = {
//                 chapter_id: chapterKey,
//                 success: chapter.success,
//                 ignorance_rate: chapter.ignorance_rate,
//               };
      
//               // Use the 'get' method to retrieve the array for the domain
//               const domainArray = this.domainDataMap.get(domain);
//               if (domainArray) {
//                 domainArray.push(chapterData);
//               }
//             }
//           }
          
        
//   });
//   // Add some console.log statements to debug the data and map
//   console.log('Processed data:', data);
//   console.log('Domain Data Map:', this.domainDataMap);
  
//   // Call the callback function to indicate data processing is completed
//   callback();
// }

// processDataCompleted() {
//   if (this.isDataProcessed) {
//     const plotContainer = this.elementRef.nativeElement.querySelector('#plot');

//   if (plotContainer) {
//     const xValues = Array.from(this.domainDataMap.keys());
//     const yValues = xValues.map((domain) => {
//       const domainData = this.domainDataMap.get(domain);
//       if (domainData) {
//         // Sum up the 'ignorance_rate' values for the domain
//         return domainData.reduce((sum, chapterData) => sum + chapterData.ignorance_rate, 0);
//       } else {
//         return 0; // Handle empty domains by providing a default value
//       }
//     });
//     console.log(xValues);

//     const colors = this.getColors(); // Call your function to generate colors

//     this.plot.createHorizontalBarChart(
//       'Line Plot',
//       'plot',
//       xValues,
//       yValues,
//       colors
//     );
//   }
//  else {
//   console.log("Element with ID 'plot' not found.");
// }
//   }
// }
//   getColors(): string[] {
//     // Example function to generate colors based on data
//     return ['blue', 'green', 'red', 'purple'];
//   }
// }