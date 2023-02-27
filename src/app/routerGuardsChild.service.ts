import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { LandingService } from "./services/landing.service";

@Injectable()
export class RouterGuardChildService {
    constructor(
        private router: Router,
        private landingSrv: LandingService
    ) { }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        console.log("AlwaysAuthChildrenGuard");
        return true;
    } 
}