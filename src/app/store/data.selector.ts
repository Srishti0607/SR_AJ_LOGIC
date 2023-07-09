
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEmployeeData from './data.reducer';

export const selectEmployeeDataState = createFeatureSelector<fromEmployeeData.EmployeeDataState>(
  fromEmployeeData.employeeFeatureKey,
);

export const selectEmployeeData = createSelector(
    selectEmployeeDataState,
  (state: fromEmployeeData.EmployeeDataState) => state.employeeData
);