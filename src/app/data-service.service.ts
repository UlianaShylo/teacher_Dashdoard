import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private domainAveragesSource = new BehaviorSubject<Map<string, number>>(new Map());
  domainAverages$ = this.domainAveragesSource.asObservable();

  private competencyAveragesSource = new BehaviorSubject<Map<string, number>>(new Map());
  competencyAverages$ = this.competencyAveragesSource.asObservable();

  updateDomainAverages(averages: Map<string, number>) {
    this.domainAveragesSource.next(averages);
  }

  updateCompetencyAverages(averages: Map<string, number>) {
    this.competencyAveragesSource.next(averages);
  }
  private selectedItemsSource = new BehaviorSubject<string[]>([]);
  selectedItems$ = this.selectedItemsSource.asObservable();

  // Method to set the selected items
  setSelectedItems(selectedItems: string[]) {
    this.selectedItemsSource.next(selectedItems);
  }
  }

