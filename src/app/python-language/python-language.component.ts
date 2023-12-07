import { Component } from '@angular/core';
import { PythonService } from "../python.service";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-python-language',
  templateUrl: './python-language.component.html',
  styleUrls: ['./python-language.component.css']
})
export class PythonLanguageComponent {
  inputText: string = ''
  errorText: string = ''
  dataClassText: string = ''

  constructor(private pythonService: PythonService, private sharedService: SharedService) {}
  
  ngOnInit(): void {
    this.sharedService.$inputText$.subscribe((text: string) => {
      this.inputText = text;
      this.convertText();
    })
  }

  convertText() {
    try {
      this.errorText = '';
      this.pythonService.updateEntity(this.inputText)
      this.dataClassText = this.pythonService.createDataclass()
    } catch(e: any) {
      this.errorText = e;
    }
  }
}
