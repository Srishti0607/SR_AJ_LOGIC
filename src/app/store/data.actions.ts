import { Action, createAction } from '@ngrx/store';
import { EmployeeData } from '../data.model';
export enum ActionTypes {
  LoadDataBegin = "[Data] Load data begin",
  LoadDataSuccess = "[Data] Load data success",
  LoadDataFailure = "[Data] Load data failure"
}

export const addEmployeeData = createAction(
  '[Employee Data] Add Employee Data',
  (data: EmployeeData) => ({data})
);

export class LoadDataBegin implements Action {
  readonly type = ActionTypes.LoadDataBegin;
}

export class LoadDataSuccess implements Action {
  readonly type = ActionTypes.LoadDataSuccess;
  constructor(public payload: { data: any }) {}
}

export class LoadDataFailure implements Action {
  readonly type = ActionTypes.LoadDataFailure;
  constructor(public payload: { error: any }) {}
}

export type ActionsUnion = LoadDataBegin | LoadDataSuccess | LoadDataFailure ;