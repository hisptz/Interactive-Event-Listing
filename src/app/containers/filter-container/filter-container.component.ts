import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnChanges {
  public isFilterSectionLoading$: Observable<boolean>;
  public isFilterSectionUpdated$: Observable<boolean>;
  public selectedFilter: string;
  public periodConfig: any;
  public selectedDataItems: any = [];
  public selectedPeriods: any = [];
  public selectedOrgUnit: any;
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
  @Input() currentUser;

  constructor() {
    this.selectedFilter = 'DATA';
    this.periodConfig = {};
    this.selectedOrgUnit = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentUser } = changes;
    if (currentUser && currentUser.currentValue) {
      const { organisationUnits } = currentUser.currentValue;
      this.selectedOrgUnit = organisationUnits;
    }
  }

  onFilterClose(event) {
    console.log({ event });
  }

  onFilterUpdateAction(event, type) {
    console.log({ event, type });
    switch (type) {
      case 'ORG_UNIT':
        this.selectedOrgUnit = event.items || [];
        break;
      default:
        break;
    }
  }

  selectFilter(type) {
    this.selectedFilter = type;
  }
}
