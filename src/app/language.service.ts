import { Injectable } from '@angular/core';
import { Attribute, Entity } from "./interfaces/entity";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  entity: Entity = {} as Entity
  idAttribute?: Attribute
  constructor() { }

  public updateEntity(text: string): void {
    this.setEntityAndIdAttribute(text);
  }

  protected setEntityAndIdAttribute(text: string): void {
    try {
      const entity = JSON.parse(text) as Entity;
      if (isInvalidEntity(entity)) {
        throw new Error('This is rethrown')
      }
      this.entity = entity
      
      this.findEntityIdAttribute();
    } catch (e) {
      throw new Error(`Invalid Json structure. You want something like this:
      
      {
        "name": string,
        "attributes": [
          {
            "name": string,
            "type": string,
            "isId": boolean
          }
        ]
      }`)
    }
    
  }
  protected findEntityIdAttribute(): void {
    this.idAttribute = this.entity
    .attributes
    .find(attr => attr.isId)
  }
}

function isInvalidEntity(entity: Entity) {
  return !entity.name || !entity.attributes || entity.attributes.some(attr => {
    return !attr.name || !attr.type || !attr.hasOwnProperty('isId');
  });
}