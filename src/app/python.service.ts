import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { pascal, snake } from 'src/utils/casing';
import {
  SQLDataType,
  convertSqlToPythonDataType,
} from 'src/utils/typemappings';
import { Attribute } from './interfaces/entity';

@Injectable({
  providedIn: 'root',
})
export class PythonService extends LanguageService {
  constructor() {
    super();
  }

  createDataclass(): string {
    const pascalName = pascal(this.entity.name);
    return `${this.determineRequiredImports(this.entity.attributes)}

@dataclass
class ${pascalName}:
    ${this.addAttributeText(this.entity.attributes)}
`;
  }

  private getAttributePythonTypeSet(attributes: Attribute[]) {
    return [
      ...new Set(
        attributes.map((attribute) =>
          convertSqlToPythonDataType(attribute.type)
        )
      ),
    ];
  }

  private determineRequiredImports(attributes: Attribute[]) {
    const required = ['from dataclasses import dataclasses'];
    const additional = this.getAttributePythonTypeSet(attributes)
      .filter((type) => type?.includes('.'))
      .map((type) => `import ${type}`)
      .sort();
    return [...additional, ...required].join('\n');
  }

  private addAttributeText(attributes: Attribute[]) {
    return attributes
      .map((attribute) => {
        const type = attribute.type as SQLDataType;
        const pythonType = convertSqlToPythonDataType(type);
        if (!pythonType) {
          throw new Error(
            `No or invalid type supplied for attribute: ${JSON.stringify(
              attribute
            )}`
          );
        }
        const snakeName = snake(attribute.name);
        return `${snakeName}: ${pythonType}`;
      })
      .join('\n    ');
  }
}
