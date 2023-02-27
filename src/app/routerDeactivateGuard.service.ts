import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanDeactivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LandingPageComponent} from './landing-page/landing-page.component';

@Injectable()
export default class RouterDeactivateGuardService implements CanDeactivate<LandingPageComponent> {

    canDeactivate(
        component: LandingPageComponent
    ) {
        console.log('De Activate Route Guard called!!');
        console.log(component);
        if(!component.canDeactivate()){
            if(window.confirm("Are You Sure?")){
                return true;
            }else{
            return false;
            }
        }
        return true;        
    }

}