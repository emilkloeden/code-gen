import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent {
  @Input() outputText: string = ""
}
