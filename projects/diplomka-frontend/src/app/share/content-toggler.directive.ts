import { Directive, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[stimContentToggler]'
})
export class ContentTogglerDirective {

  @Input() toggledContent: HTMLDivElement;
  @Input() icon: HTMLElement;

  private _visible = true;

  constructor(private readonly _renderer: Renderer2) { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();

    this._visible = !this._visible;
    if (this._visible) {
      this._renderer.removeClass(this.toggledContent, 'd-none');
      this._renderer.removeClass(this.icon, 'fa-plus');
      this._renderer.addClass(this.icon, 'fa-minus');
    } else {
      this._renderer.addClass(this.toggledContent, 'd-none');
      this._renderer.addClass(this.icon, 'fa-plus');
      this._renderer.removeClass(this.icon, 'fa-minus');
    }
  }

}
