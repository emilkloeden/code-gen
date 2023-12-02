import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css']
})
export class CodeInputComponent {
  @Output() textAreaTextChanged = new EventEmitter<string>();
  textAreaText: string = ``;
  @Input() initialText: string = '';


  ngOnInit() {
    this.textAreaText = this.initialText;
    this.textAreaTextChanged.emit(this.textAreaText)
  }
  onInput(event: Event) {
    this.textAreaText = (event.target as HTMLTextAreaElement).value
    this.textAreaTextChanged.emit(this.textAreaText)
  }
}
