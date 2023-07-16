import { Action, createReducer, on } from '@ngrx/store';
import * as EmployeeDataActions from './data.actions';
import { EmployeeData } from '../data.model';

export const employeeFeatureKey = 'data';

export interface EmployeeDataState {
  employeeData: EmployeeData[];
}

export const initialState: EmployeeDataState = {
  employeeData: []
};

export const employeeDataReducer = createReducer(
  initialState,
  on(EmployeeDataActions.addEmployeeData,
    (state: EmployeeDataState, { data }) =>
    ({
      ...state,
      employeeData: [...state.employeeData, data]
    })),
  on(EmployeeDataActions.submitCustomer, (state) => ({ ...state })),
);

export function reducer(state: EmployeeDataState | undefined, action: Action): any {
  return employeeDataReducer(state, action);
}