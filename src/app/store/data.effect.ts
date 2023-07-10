import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LandingService } from '../services/landing.service';
import { map, catchError, switchMap } from 'rxjs/operators'
import * as EmployeeDataActions from './data.actions';
import { of } from 'rxjs';

@Injectable()
export class DataEffects {

  constructor(
    private actions: Actions,
    private landingSrv: LandingService
  ) { }

  
  loadData = createEffect(() => this.actions.pipe(
    ofType(EmployeeDataActions.ActionTypes.LoadDataBegin),
    switchMap(() => {
      return this.landingSrv.getUsers().pipe(
        map(data => new EmployeeDataActions.LoadDataSuccess({ data: data })),
        catchError(error =>
          of(new EmployeeDataActions.LoadDataFailure({ error: error }))
        )
      );
    })
  ));
}
