import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-display-section',
  templateUrl: './code-display-section.component.html',
  styleUrls: ['./code-display-section.component.css']
})
export class CodeDisplaySectionComponent {
  @Input() entity!: string
  @Input() outputText: string = '';

  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.outputText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
