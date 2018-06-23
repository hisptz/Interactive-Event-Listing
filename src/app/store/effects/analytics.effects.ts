import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AnalyticsActionTypes, LoadAnalytics, AddAnalytics, LoadAnalyticsFail, GenerateTableObject } from '../actions';
import { concatMap, map, catchError, flatMap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { getMergedAnalytics, standardizeIncomingAnalytics } from '../../helpers';

@Injectable()
export class AnalyticsEffects {
  constructor(private actions$: Actions, private http: NgxDhis2HttpClientService) {}

  @Effect()
  loadEventAnalytics$: Observable<any> = this.actions$.pipe(
    ofType(AnalyticsActionTypes.LoadAnalytics),
    map((action: LoadAnalytics) => action.filterSelection),
    concatMap(({ dx, pe, ou }) => {
      const peValue = pe.map(({ id }) => id).join('&');
      const ouValue = ou.map(({ id }) => id).join('&');
      const dxGroupedByPrograms = this.groupBy(dx, 'programid');
      const groupedDx = Object.assign(
        {},
        ...Object.keys(dxGroupedByPrograms).map(key => {
          const dxAll = dxGroupedByPrograms[key];
          const attributes = dxAll.filter(({ type }) => type === 'pa');
          const allDataElements = dxAll.filter(({ type }) => type === 'de');
          const dataElements = this.groupBy(allDataElements, 'programStageid');
          const programStages = Object.keys(dataElements);
          return { [key]: { attributes, dataElements, programStages } };
        })
      );
      const queryUrls = this.constructUrl(peValue, ouValue, groupedDx);
      return forkJoin(queryUrls.map(url => this.http.get(url))).pipe(
        map(analytics => {
          const arrayToObject = (row, headers) =>
            Object.assign({}, ...row.map((item, index) => ({ [headers[index].column]: item })));
          const { rows, headers, metaData } = getMergedAnalytics(
            analytics.map(analytic => standardizeIncomingAnalytics(analytic))
          );
          const mergedAnalytics = {
            headers: headers.map(header => header.column),
            data: rows.map(row => arrayToObject(row, headers))
          };
          return new AddAnalytics(mergedAnalytics);
        }),
        catchError((error: any) => of(new LoadAnalyticsFail(error)))
      );
    })
  );

  // @Effect()
  // generateTableObject$: Observable<any> = this.actions$.pipe(
  //   ofType(AnalyticsActionTypes.AddAnalytics),
  //   map((action: AddAnalytics) => action.analytics),
  //   flatMap(analytics => new GenerateTableObject(analytics))
  // );

  groupBy(array, key) {
    return array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  constructUrl(peValue, ouValue, dxObject): any[] {
    return Object.keys(dxObject)
      .map(key => {
        const { attributes, dataElements, programStages } = dxObject[key];
        const attributeValues = attributes.map(({ id }) => `dimension=${id}`).join('&');
        const dimensions = attributes.length
          ? `dimension=ou:${ouValue}&dimension=pe:${peValue}&${attributeValues}`
          : `dimension=ou:${ouValue}&dimension=pe:${peValue}`;
        const programEventQuery = `analytics/events/query/${key}.json?${dimensions}`;
        const programUrls = programStages.map(programStageid => {
          const prStageDeValue = dataElements[programStageid].map(({ id }) => `dimension=${id}`).join('&');
          return `${programEventQuery}&${prStageDeValue}&stage=${programStageid}`;
        });

        return programUrls.length ? programUrls : [programEventQuery];
      })
      .reduce((acc, cur) => acc.concat(cur), []);
  }
}
