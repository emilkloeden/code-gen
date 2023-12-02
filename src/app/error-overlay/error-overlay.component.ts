import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-overlay',
  templateUrl: './error-overlay.component.html',
  styleUrls: ['./error-overlay.component.css']
})
export class ErrorOverlayComponent {
  @Input() errorText?: string;
}
