import { Action } from '@ngrx/store';
import { Analytics, FilterSelection } from '../../models/analytics.model';

export enum AnalyticsActionTypes {
  LoadAnalytics = '[Analytics] Load Analytics',
  LoadAnalyticsFail = '[Analytics] Load Analytics Fail',
  AddAnalytics = '[Analytics] Add Analytics',
  UpdateAnalytics = '[Analytics] Update Analytics',
  GenerateTableObject = '[Analytics] Generate Table Object',
  GenerateTableObjectFail = '[Analytics] Generate Table Object Fail'
}

export class LoadAnalytics implements Action {
  readonly type = AnalyticsActionTypes.LoadAnalytics;
  constructor(public filterSelection: FilterSelection) {}
}

export class AddAnalytics implements Action {
  readonly type = AnalyticsActionTypes.AddAnalytics;

  constructor(public analytics: Analytics) {}
}

export class LoadAnalyticsFail implements Action {
  readonly type = AnalyticsActionTypes.LoadAnalyticsFail;

  constructor(public error: any) {}
}

export class GenerateTableObject implements Action {
  readonly type = AnalyticsActionTypes.GenerateTableObject;

  constructor(public analytics: any) {}
}

export class GenerateTableObjectFail implements Action {
  readonly type = AnalyticsActionTypes.GenerateTableObjectFail;

  constructor(public error: any) {}
}

export type AnalyticsActions =
  | LoadAnalytics
  | AddAnalytics
  | LoadAnalyticsFail
  | GenerateTableObject
  | GenerateTableObjectFail;
