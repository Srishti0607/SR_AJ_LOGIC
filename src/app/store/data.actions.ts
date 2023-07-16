import { Action, createAction, props } from '@ngrx/store';
import { EmployeeData } from '../data.model';
export enum ActionTypes {
  LoadDataFailure = "[Data] Load data failure"
}

export const addEmployeeData = createAction(
  '[Employee Data] Add Employee Data',
  (data: EmployeeData) => ({data})
);

export const submitCustomer = createAction("[Customer] Submit Customer", props<{ obj: any[] }>());

export class LoadDataFailure implements Action {
  readonly type = ActionTypes.LoadDataFailure;
  constructor(public payload: { error: any }) {}
}

export const ActionsUnion =  LoadDataFailure ;