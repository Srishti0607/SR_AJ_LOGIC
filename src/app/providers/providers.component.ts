import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent {

  constructor(  
    @Inject('FIRSTNAME') public FIRSTNAME: string,
    @Inject('CONFIG') public CONFIG: any,
    @Inject('FUNC') public getValueName: any,
    @Inject('FACT') public fact: any,
    @Inject('FUNC1') public getFactName: any
    ){
  
  }

  ngOnInit(){
    this.FIRSTNAME = 'Srishti';
    console.log(this.CONFIG);
  }

}
