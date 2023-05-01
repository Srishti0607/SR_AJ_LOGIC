import { Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomIf]'
})
export class CustomIfDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appCustomIf(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

@Directive({
  selector: '[customNgFor]'
})
export class NgForObjectDirective implements OnChanges {
  @Input() customNgForFrom: { [key: string]: any };

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customNgForFrom && changes.customNgForFrom.currentValue) {
      // remove all views
      this.viewContainerRef.clear();

      // create a new view for each property
      const det = Object.keys(changes.customNgForFrom.currentValue);
      det.forEach((det: string, index: number) => {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          // default value that will be used if an attribute is not assigned one
          $implicit: det,
          index
        });
      });
    }
  }
}

@Directive({
  selector: '[hideAfter]',
})
export class MyStructDirective implements OnInit {
  @Input('hideAfter') delay = 0;

  @Input('hideAfterThen') placeholder: TemplateRef<any> | null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template);

    setTimeout(() => {
      this.viewContainerRef.clear();

      if (this.placeholder) {
        this.viewContainerRef.createEmbeddedView(this.placeholder);
      }
    }, this.delay);
  }
}

@Directive({
  selector: '[repeatItself]'
})
export class RepeatDirective {
  constructor(private _templateRef: TemplateRef<any>,
     private _viewContainer: ViewContainerRef) { }

  @Input() set repeatItself(count: number) {
    for (var i = 0; i < count; i++) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  }
}


