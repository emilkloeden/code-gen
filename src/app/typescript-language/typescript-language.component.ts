import { Component, OnInit } from '@angular/core';
import { TypescriptService } from "../typescript.service";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-typescript-language',
  templateUrl: './typescript-language.component.html',
  styleUrls: ['./typescript-language.component.css']
})
export class TypescriptLanguageComponent implements OnInit {
  inputText: string = ''
  errorText: string = ''
  interfaceText: string = ''

  constructor(private typescriptService: TypescriptService, private sharedService: SharedService) {}
  
  ngOnInit(): void {
    this.sharedService.$inputText$.subscribe(text => {
      this.inputText = text;
      this.convertText();
    })
  }

  convertText() {
    try {
      this.errorText = '';
      this.typescriptService.updateEntity(this.inputText)
      this.interfaceText =this.typescriptService.createInterface()
    } catch(e: any) {
      console.error(e)
      console.warn(e.message)
      this.errorText = e;
    }
  }

}
