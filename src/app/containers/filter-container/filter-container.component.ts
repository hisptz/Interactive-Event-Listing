import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit {
  public isFilterSectionLoading$: Observable<boolean>;
  public isFilterSectionUpdated$: Observable<boolean>;
  public selectedFilter: string;
  public periodConfig: any;
  public selectedDataItems: any = [];
  public selectedPeriods: any = [];
  public orgUnitModel: any = {
    selectionMode: 'orgUnit',
    selectedLevels: [],
    showUpdateButton: true,
    selectedGroups: [],
    orgUnitLevels: [],
    orgUnitGroups: [],
    selectedOrgUnits: [],
    userOrgUnits: [],
    type: 'report', // can be 'data_entry'
    selectedUserOrgUnits: []
  };
  constructor() {
    this.selectedFilter = 'DATA';
    this.periodConfig = {};
  }

  ngOnInit() {}

  onFilterClose(event) {
    console.log({ event });
  }

  onFilterUpdateAction(event, type) {
    console.log({ event, type });
  }
}
