import { Component, Input } from '@angular/core';
import { SpringService } from "./spring.service";
import { TypescriptService } from "./typescript.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'code-gen';
  // Spring
  repositoryRestResourceText: string = ''
  entityText: string = ''
  repositoryText: string = ''
  controllerText: string = ''
  serviceText: string = ''
  // Typescript
  typescriptInterfaceText: string = ''

  errorText: string = ''
  
  inputText: string =`{
    "name": "user",
    "attributes": [
    {
        "name": "id",
        "type": "char",
        "isId": true
    },
    {
        "name": "firstName",
        "type": "char",
        "isId": false
    },
    {
        "name": "lastName",
        "type": "char",
        "isId": false
    },
    {
        "name": "age",
        "type": "int",
        "isId": false
    }
    ]
  }
`;

constructor(private springService: SpringService, private typescriptService: TypescriptService) {}
  convertText() {
    try {
      this.errorText = '';
      this.springService.updateEntity(this.inputText)
      this.repositoryRestResourceText =this.springService.createRepositoryRestResource()
      this.entityText = this.springService.createEntity()
      this.repositoryText = this.springService.createRepository()
      this.controllerText = this.springService.createController()
      this.serviceText = this.springService.createService()
      this.typescriptService.updateEntity(this.inputText);
      this.typescriptInterfaceText = this.typescriptService.createInterface()
    } catch(e: any) {
      console.error(e)
      console.warn(e.message)
      this.errorText = e;
    }
      console.log(this.repositoryRestResourceText)
  }

  receivedTextChange(text: string): void {
    this.inputText = text;
    this.convertText();

  }
}
