import { Directive,Input, OnChanges, SimpleChanges, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[tjPhones]'
})
export class PhoneDirective{

  constructor(private _el: ElementRef) {
    console.log('Iniciand directiva phone');
  }

  @HostListener('input', ['$event']) onInputChange(event) {
      const initalValue = this._el.nativeElement.value;
      this._el.nativeElement.value = initalValue.replace(/[0-9]{4}$/, '');
      console.log("VEMOS :: ", this._el.nativeElement.value )


  }

}
