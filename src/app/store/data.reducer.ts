import {Action, createReducer, on} from '@ngrx/store';
import * as EmployeeDataActions from './data.actions';
import { EmployeeData } from '../data.model';

export const employeeFeatureKey = 'data'; 

export interface EmployeeDataState {
  employeeData: EmployeeData[];
}

export interface DataState {
  items: string[];
  loading: boolean;
  error: any;
}

export const initialState: EmployeeDataState = {
    employeeData: []
};

export const initialState1: DataState = {
  items: [],
  loading: false,
  error: null,
};

export const employeeDataReducer = createReducer(
  initialState,
  on(EmployeeDataActions.addEmployeeData,
    (state: EmployeeDataState, {data}) =>
      ({...state,
        employeeData: [...state.employeeData, data]
      }))
);

export const getItems = (state: DataState) => state.items;

export function reducer(state: EmployeeDataState | undefined, action: Action): any {
  return employeeDataReducer(state, action);
}

export function reducer1(
  state = initialState1,
  action: EmployeeDataActions.ActionsUnion
): DataState {
  switch (action.type) {
    case EmployeeDataActions.ActionTypes.LoadDataBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case EmployeeDataActions.ActionTypes.LoadDataSuccess: {
      return {
        ...state,
        loading: false,
        items: action.payload.data,
      };
    }
    case EmployeeDataActions.ActionTypes.LoadDataFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}