import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
//Component
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
//Modules /Material
import { AppRoutingModule } from './app-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LandingService} from './services/landing.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadDirectiveComponent } from './load-directive/load-directive.component';
import { InputListComponentComponent } from './input-list-component/input-list-component.component';
import {ComponentLoadDirective} from './directives/compLoader.directive'
import {IfDirective} from './directives/structFunc.directive';
import { LoadPipeComponent } from './load-pipe/load-pipe.component'
import { FieldAscSortPipe,CapitalPipe,SearchPipe } from "./pipes/custom.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoadDirectiveComponent,
    InputListComponentComponent,
    ComponentLoadDirective,
    IfDirective,
    LoadPipeComponent,
    FieldAscSortPipe,
    CapitalPipe,
    SearchPipe    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LandingService,
    FieldAscSortPipe,CapitalPipe,SearchPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
