import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-event-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnChanges {
  public headers;
  public rows;
  public reorderable: boolean;
  constructor() {
    this.reorderable = true;
  }

  @Input() analytics;
  @Input() isAnalyticsLoading;
  @Input() isAnalyticsLoaded;
  @Input() downloadExcel;

  ngOnChanges(changes: SimpleChanges) {
    const { analytics, downloadExcel } = changes;
    if (analytics && analytics.currentValue) {
      const { headers, data } = analytics.currentValue;
      this.headers = headers;
      this.rows = data;
    }
    if (downloadExcel && downloadExcel.currentValue) {
      this.exportDataToExcel();
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }

  exportDataToExcel() {
    this.exportAsExcelFile(this.rows, 'EventsListing');
  }
}
