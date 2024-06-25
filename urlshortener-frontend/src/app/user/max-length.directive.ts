import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {
  @Input()
  appMaxLength:number=10;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const maxLength = this.appMaxLength || 10; // Default to 10 if no value is provided
    const input = event.target.value;

    if (input.length > maxLength) {
      event.preventDefault();
      this.el.nativeElement.value = input.substring(0, maxLength);
    }
  }
}
