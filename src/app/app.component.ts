import { Component, Input } from '@angular/core';
import { SpringService } from "./spring.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'code-gen';
  repositoryRestResourceText: string = ''
  entityText: string = ''
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

constructor(private springService: SpringService) {}
  convertText() {
    this.repositoryRestResourceText =this.springService.createRepositoryRestResource(this.inputText)
    this.entityText = this.springService.createEntity(this.inputText)
    console.log(this.repositoryRestResourceText)
  }

  receivedTextChange(text: string): void {
    this.inputText = text;
    this.convertText();

  }
}
