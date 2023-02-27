import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LandingService } from "./services/landing.service";

@Injectable()
export class RouterGuardService {
    constructor(
        private router: Router,
        private landingSrv: LandingService
    ) { }

    canActivate(
        route: ActivatedRoute,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        console.log('Can Activate Route Guard called!!');        
        console.log(route.params);
        console.log(state.url);
        if (this.landingSrv.parameterizedCalled) {
            return true;
        } else {
            window.alert('You dont have permission to access this page');
            return false;
        }
    }

}