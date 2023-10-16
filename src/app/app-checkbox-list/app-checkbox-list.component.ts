import { Component } from '@angular/core';


@Component({
  selector: 'app-checkbox-list',
  templateUrl: './app-checkbox-list.component.html',
})
export class CheckboxListComponent {
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  selectedOptions: string[] = [];

  optionChanged() {
    // Handle changes when options are selected/deselected
    console.log(this.selectedOptions);
    // Add your logic here
  }
}

