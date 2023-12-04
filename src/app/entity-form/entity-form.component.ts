import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  @Output() updateEntityForm = new EventEmitter();

  private idDemoGroup = this.formBuilder.group({
    name: ['id', Validators.required],
    type: ['char', Validators.required],
    isId: [true]
  })

  private firstNameDemoGroup = this.formBuilder.group({
    name: ['first_name', Validators.required],
    type: ['varchar', Validators.required],
    isId: [false]
  })

  
  private lastNameDemoGroup = this.formBuilder.group({
    name: ['last_name', Validators.required],
    type: ['nvarchar', Validators.required],
    isId: [false]
  })
  
  private ageDemoGroup = this.formBuilder.group({
    name: ['age', Validators.required],
    type: ['int', Validators.required],
    isId: [false]
  })

  entityForm = this.formBuilder.group({
    name: ['user', Validators.required],
    attributes: this.formBuilder.array([this.idDemoGroup, this.firstNameDemoGroup, this.lastNameDemoGroup, this.ageDemoGroup])
  })

  

  get attributes(): FormArray {
    return this.entityForm.get('attributes') as FormArray
  }

  addAttribute() {
    const attribute = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      isId: [false]
    });
    this.attributes.push(attribute);
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }

  clearAttributes() {
    this.attributes.clear()
  }

  onSubmit() {
    if (!this.entityForm.invalid) {
      this.updateEntityForm.emit(JSON.stringify(this.entityForm.value, null, 2))

    }
  }

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.updateEntityForm.emit(JSON.stringify(this.entityForm.value, null, 2))
  }
}
