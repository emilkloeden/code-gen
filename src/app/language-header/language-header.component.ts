import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-header',
  templateUrl: './language-header.component.html',
  styleUrls: ['./language-header.component.css']
})
export class LanguageHeaderComponent {
 @Input() title!: string;
}
