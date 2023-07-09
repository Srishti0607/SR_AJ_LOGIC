import { createAction } from '@ngrx/store';
import { EmployeeData } from '../data.model';

export const addEmployeeData = createAction(
  '[Employee Data] Add Employee Data',
  (data: EmployeeData) => ({data})
);