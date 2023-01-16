
import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
  } from '@angular/core';
  
  @Directive({
    selector: '[conditionalIf]',
  })
  export class IfDirective implements OnInit {
    private showElement = false;
    @Input() set conditionalIf(show: boolean) {
      this.showElement = show;
      this.displayTemplate();
    }
  
    constructor(
      private templateRef: TemplateRef<unknown>,
      private vcr: ViewContainerRef
    ) {}
  
    ngOnInit(): void {
        this.displayTemplate();
    }

    private displayTemplate() {
        this.vcr.clear();
        if (this.showElement) {
          this.vcr.createEmbeddedView(this.templateRef);
        }
      }
  }