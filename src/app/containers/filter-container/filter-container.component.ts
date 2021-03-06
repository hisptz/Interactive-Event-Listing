import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs';
import { LoadAnalytics } from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'app-filter-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnChanges {
  public isFilterSectionLoading$: Observable<boolean>;
  public isFilterSectionUpdated$: Observable<boolean>;
  public filterValues: any;
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
  @Input() isAnalyticsLoaded: boolean;
  @Output() onDownloadClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) {
    this.selectedFilter = 'DATA';
    this.periodConfig = {};
    this.selectedOrgUnit = [];
    const today = new Date();
    const thisyear = today.getFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const thisMonth = today.getMonth();
    this.selectedPeriods = [
      {
        id: thisMonth >= 9 ? `${thisyear}${thisMonth + 1}` : `${thisyear}0${thisMonth + 1}`,
        name: `${monthNames[thisMonth]} ${thisyear}`,
        type: 'Monthly'
      }
    ];

    this.filterValues = { pe: this.selectedPeriods.map(({ id }) => id).join(';') };
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentUser } = changes;
    if (currentUser && currentUser.currentValue) {
      const { organisationUnits } = currentUser.currentValue;
      this.selectedOrgUnit = organisationUnits;
      this.filterValues = { ...this.filterValues, ou: this.selectedOrgUnit.map(({ id }) => id).join(';') };
    }
  }

  onFilterClose(event) {
    this.selectedFilter = null;
  }

  onFilterUpdateAction(event, type) {
    switch (type) {
      case 'ORG_UNIT':
        this.selectedOrgUnit = event.items || [];
        this.filterValues = { ...this.filterValues, ou: event.value };
        break;
      case 'PERIOD':
        this.selectedPeriods = event.items || [];
        this.filterValues = { ...this.filterValues, pe: event.value };
        break;
      case 'DATA':
        this.selectedDataItems = event.itemList || [];
        break;
      default:
        break;
    }
    this.selectedFilter = null;
    const peDxAndOrgSelected =
      this.selectedDataItems.length && this.selectedPeriods.length && this.selectedOrgUnit.length;
    if (peDxAndOrgSelected) {
      this.store.dispatch(new LoadAnalytics({ dx: this.selectedDataItems, ...this.filterValues }));
    }
  }

  selectFilter(type) {
    this.selectedFilter = type;
  }

  downloadExcel() {
    const download = true;
    this.onDownloadClicked.emit({ download });
  }
}
