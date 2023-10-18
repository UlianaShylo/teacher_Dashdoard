import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { PlotlyComponent } from '../plotly-component/plotly-component.component';
import { DataService } from '../data-service.service';
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],

})
export class MultiSelectComponent implements OnInit{
  selectedItems: string[] = [];
  options: string[] = [];
  showDropdown = false;

  constructor(private dataService: DataService) { }
  @Output() itemSelected = new EventEmitter<string>();
  ngOnInit() {
    this.dataService.domainAverages$.subscribe((averages) => {
      this.options = Array.from(averages.keys());
    });

    this.dataService.competencyAverages$.subscribe((averages) => {
      // Handle competency averages data here
    });
     // Subscribe to the selected items from MultiSelectComponent
     this.dataService.selectedItems$.subscribe((selectedItems) => {
      this.selectedItems = selectedItems;
    });
  }



  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleSelection(option: string) {
    if (this.selectedItems.includes(option)) {
      this.selectedItems = this.selectedItems.filter(item => item !== option);
    } else {
      this.selectedItems.push(option);
    }
  }
}
