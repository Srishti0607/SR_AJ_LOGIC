import { Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicDirective]',
})
export class ComponentLoadDirective {
  @Input() numericOnly = false;
  @Input() allowSpace = false;
  @Input() alphabetsOnly = false;
  @Input() alphaNumericOnly = false;
  @HostListener('input', ['$event']) input() {
    if (this.alphaNumericOnly) {
      const regex = this.allowSpace ? /[^a-zA-Z0-9 ]/g : /[^a-zA-Z0-9]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ''
      );
    } else if (this.alphabetsOnly) {
      const regex = this.allowSpace ? /[^a-zA-Z ]/g : /[^a-zA-Z]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ''
      );
    } else if (this.numericOnly) {
      const regex = this.allowSpace ? /[^0-9 ]/g : /[^0-9]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ''
      );
    }
  }
  @HostListener('textarea', ['$event']) textarea() {
    if (this.alphaNumericOnly) {
      const regex = this.allowSpace ? /[^a-zA-Z0-9 ]/g : /[^a-zA-Z0-9]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ''
      );
    } else if (this.alphabetsOnly) {
      const regex = this.allowSpace ? /[^a-zA-Z ]/g : /[^a-zA-Z]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ''
      );
    } else if (this.numericOnly) {
      const regex = this.allowSpace ? /[^0-9 ]/g : /[^0-9]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ''
      );
    }
  }
  constructor(public viewContainerRef: ViewContainerRef,private el: ElementRef) { }
}
