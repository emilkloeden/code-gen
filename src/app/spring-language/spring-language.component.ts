import { Component, Input, OnInit } from '@angular/core';
import { SpringService } from "../spring.service";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-spring-language',
  templateUrl: './spring-language.component.html',
  styleUrls: ['./spring-language.component.css']
})
export class SpringLanguageComponent implements OnInit {
  inputText: string = ''
  errorText: string = ''
 // Spring
 repositoryRestResourceText: string = ''
 entityText: string = ''
 repositoryText: string = ''
 controllerText: string = ''
 serviceText: string = ''

  constructor(private springService: SpringService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.$inputText$.subscribe(text => {
      this.inputText = text;
      this.convertText();
    })
  }

  convertText() {
    try {
      this.errorText = '';
      this.springService.updateEntity(this.inputText)
      this.repositoryRestResourceText =this.springService.createRepositoryRestResource()
      this.entityText = this.springService.createEntity()
      this.repositoryText = this.springService.createRepository()
      this.controllerText = this.springService.createController()
      this.serviceText = this.springService.createService()
    }catch(e: any) {
      console.error(e)
      console.warn(e.message)
      this.errorText = e;
    }
      console.log(this.repositoryRestResourceText)
  }
}
