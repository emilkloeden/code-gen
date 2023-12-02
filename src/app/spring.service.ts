import { Injectable } from '@angular/core';
import { kebab, pascal, lower, plural } from "src/utils/casing";
type SQLDataType = 'char' | 'int'
type JavaDataType = 'String' | 'Long'

const sqlToJavaDataType: Map<SQLDataType, JavaDataType> = new Map();
sqlToJavaDataType.set('char', 'String');
sqlToJavaDataType.set('int', 'Long');

function convertSqlToJavaDataType(sqlDataType: SQLDataType) {
  return sqlToJavaDataType.get(sqlDataType);
}

interface Attribute {
  name: string;
  type: SQLDataType;
  isId: boolean;
}

interface Entity {
  name: string;
  attributes: Attribute[]
}

@Injectable({
  providedIn: 'root'
})
export class SpringService {
  entity: Entity = {} as Entity
  idAttribute?: Attribute
  constructor() { }

  private findEntityIdAttribute(): void {
    this.idAttribute = this.entity
    .attributes
    .find(attr => attr.isId)
  }
  private addIdColumnText(entity: Entity): string {
    if (this.idAttribute) {
      return `@Id
  @GeneratedValue(strategy = GenerationType.AUTO)`
    }
    return '';
  }

  private addAttributeText(attributes: Attribute[]) {
    return attributes.map(attribute => {
      return `private ${convertSqlToJavaDataType(attribute.type)} ${lower(attribute.name)};`
    }).join('\n  ')
  }

  private setEntityAndIdAttribute(text: string): void {
    this.entity = JSON.parse(text);
    this.findEntityIdAttribute();
  }

  createRepositoryRestResource(text: string) {
    this.setEntityAndIdAttribute(text);
    const pascalName = pascal(this.entity.name); // TODO: implement
    const kebabPlural = kebab(plural(this.entity.name))
    const idType = this.findIdType(this.entity);
    return `@RepositoryRestResource(collectionResourceRel = "${kebabPlural}", path= "${kebabPlural}")
public interface ${pascalName}Repository extends JpaRepository<${pascalName}, ${idType}> {

}
    `
  }

  createEntity(text: string) {
    this.setEntityAndIdAttribute(text);
    const pascalName = pascal(this.entity.name); // TODO: implement
    const kebabPlural = kebab(plural(this.entity.name))
    const idType = this.findIdType(this.entity);
    return `import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data

@Data
@Entity
public class ${pascalName} {
  ${this.addIdColumnText(this.entity)}
  ${this.addAttributeText(this.entity.attributes)}
}`
  }

  private findIdType(entity: Entity): JavaDataType {
    const sqlType: SQLDataType | undefined = entity
    .attributes
    .find(attr => attr.isId)
    ?.type
    if (!sqlType) {
      throw new Error(`No id found for ${entity.name}`)
    }
    const javaType: JavaDataType | undefined = convertSqlToJavaDataType(sqlType);
    if (!javaType) {
      throw new Error(`Unable to convert ${sqlType} to a Java data type.`) 
    }
    return javaType
  }
}
