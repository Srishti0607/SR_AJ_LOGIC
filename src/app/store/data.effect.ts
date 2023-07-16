import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LandingService } from '../services/landing.service';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators'
import * as EmployeeDataActions from './data.actions';
import { of } from 'rxjs';

@Injectable()
export class DataEffects {

  constructor(
    private actions: Actions,
    private landingSrv: LandingService
  ) { }

  getId$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(EmployeeDataActions.submitCustomer),
        map(action => action.obj),
        exhaustMap(
          (obj) => this.landingSrv.submitUser(obj).pipe(
            map((first) => ({first})),
            map((resp) => null)
          )
        )
      ),{ dispatch: false}
  );
          }
