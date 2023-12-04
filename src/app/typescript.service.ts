import { Injectable } from '@angular/core';
import { Attribute, Entity } from "./interfaces/entity";
import { camel, pascal } from "src/utils/casing";
import { SQLDataType, convertSqlToTypescriptDataType } from "src/utils/typemappings";
import { LanguageService } from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class TypescriptService extends LanguageService{
  constructor() { super() }

  public createInterface() {
    const pascalName = pascal(this.entity.name)
    return `export interface ${pascalName} {
  ${this.addAttributeText(this.entity.attributes)}
}`
  }
  
  private addAttributeText(attributes: Attribute[]) {
    return attributes.map(attribute => {
      const type = attribute.type as SQLDataType;
      const typescriptType = convertSqlToTypescriptDataType(type);
      if (!typescriptType) {
        throw new Error(`No or invalid type supplied for attribute: ${JSON.stringify(attribute)}`)
      }
      const camelName = camel(attribute.name)
      return `${camelName}: ${typescriptType};`
    }).join('\n  ')
  }
}

