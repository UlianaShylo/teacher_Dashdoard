import { Component, OnInit } from '@angular/core';
import { PlotlyService} from '../plotly.service';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-plotly-component',
  templateUrl: './plotly-component.component.html',
  styleUrls: ['./plotly-component.component.css']
})
export class PlotlyComponent implements OnInit {
  skillsData: any[] | undefined; 
  domainDataMap: Map<string, any[]> = new Map();
  competencyDataMap: Map<string, any[]> = new Map();
  domainAverages = new Map<string, number>();
  competencyAverages = new Map<string, number>();
  selectedItems: string[] = [];


  constructor(
    private plot: PlotlyService,
    private dataService: DataService
  ) { }

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
                ignorance_rate: 100 - chapter.ignorance_rate,
              };
             
              if (this.domainDataMap!.has(domain)) {
                this.domainDataMap!.get(domain)!.push(chapterData);
              }
            }
          }
          
        });

        this.skillsData.forEach((skill) => {
          const competency = skill.competency;
          if (!this.competencyDataMap.has(competency)) {
            this.competencyDataMap.set(competency, []);
          }
          for (const chapterKey in skill.chapters) {
            if (skill.chapters.hasOwnProperty(chapterKey)) {
              const chapter = skill.chapters[chapterKey];
              const chapterData = {
                chapter_id: chapterKey,
                success: chapter.success,
                ignorance_rate: 100 - chapter.ignorance_rate,
              };
             
              if (this.competencyDataMap!.has(competency)) {
                this.competencyDataMap!.get(competency)!.push(chapterData);
              }
            }
          }
          
        });


        this.findAvaragesDom();
        this.findAveragesComp();
        this.dataService.updateDomainAverages(this.domainAverages);
        this.dataService.updateCompetencyAverages(this.competencyAverages);

        this.dataService.selectedItems$.subscribe((selectedItems) => {
          this.selectedItems = selectedItems;
          console.log(selectedItems);
          for (let i = 0; i < selectedItems.length; i++) {
            console.log(this.domainDataMap.get(selectedItems[i]));
          }

        });

        const colors = ['blue', 'green', 'red', 'purple'];
        console.log(this.domainAverages);
        
        this.plot.plotLine("Line Plot", "plot", Array.from(this.domainAverages.keys()), Array.from(this.domainAverages.values()));

        const windRoseData = [{
          type: 'scatterpolar',
          r: Array.from(this.domainAverages.values()),  
          theta: Array.from(this.domainAverages.keys()), 
          fill: 'toself',
          name: 'Domain Averages',  
        }];

          this.plot.plotWindRose('Wind Rose Chart', 'wind-rose-plot', windRoseData);
        this.plot.plotLine("Line Plot Competency", "plot1", Array.from(this.competencyAverages.keys()), Array.from(this.competencyAverages.values()));

        const windRoseData1 = [{
          type: 'scatterpolar',
          r: Array.from(this.competencyAverages.values()),  
          theta: Array.from(this.competencyAverages.keys()), 
          fill: 'toself',
          name: 'Competency Averages',  
        }];

          this.plot.plotWindRose('Wind Rose Chart comp', 'wind-rose-plot1', windRoseData1)
      }
    });
    
  } 
  findAvaragesDom() {
    
    for (const [domain, chapters] of this.domainDataMap) {
      const totalIgnorance = chapters.reduce((sum, chapter) => sum + chapter.ignorance_rate, 0);
      let averageIgnorance = totalIgnorance / chapters.length;
      if (Number.isNaN(averageIgnorance)){
        averageIgnorance = 0;
      }
      this.domainAverages.set(domain, averageIgnorance);
    }
}


findAveragesComp()
{
  for (const [competency, chapters] of this.competencyDataMap) {
    const totalIgnorance = chapters.reduce((sum, chapter) => sum + chapter.ignorance_rate, 0);
    let averageIgnorance = totalIgnorance / chapters.length;
    if (Number.isNaN(averageIgnorance)){
      averageIgnorance = 0;
    }
    this.competencyAverages.set(competency, averageIgnorance);
  }
}}
