import { Injectable } from '@angular/core';
import { camel, kebab, pascal, lower, plural } from "src/utils/casing";
import type { SQLDataType, JavaDataType } from "src/utils/typemappings";
import {convertSqlToJavaDataType} from "src/utils/typemappings";

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

  

  public updateEntity(text: string): void {
    this.setEntityAndIdAttribute(text);
  }

  private setEntityAndIdAttribute(text: string): void {
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
  private findEntityIdAttribute(): void {
    this.idAttribute = this.entity
    .attributes
    .find(attr => attr.isId)
  }

  createRepositoryRestResource(): string {
    try {
      const pascalName = pascal(this.entity.name);
      const kebabPlural = kebab(plural(this.entity.name))
      if (!this.idAttribute) {
        throw new Error('You need an attribute with a "name": "id" pair to generate a RepositoryRestResource.')
      }
      const idType = this.findIdType();
      return `@RepositoryRestResource(collectionResourceRel = "${kebabPlural}", path= "${kebabPlural}")
public interface ${pascalName}Repository extends JpaRepository<${pascalName}, ${idType}> {

}`
    } catch(e: any) {
      throw e;
    }
   
  }

  createEntity(): string {
    const pascalName = pascal(this.entity.name);
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

  private findIdType(): JavaDataType {
    const sqlType: SQLDataType | undefined = this.entity
    .attributes
    .find(attr => attr.isId)
    ?.type
    if (!sqlType) {
      throw new Error(`No id found for ${this.entity.name}`)
    }
    const javaType: JavaDataType | undefined = convertSqlToJavaDataType(sqlType);
    if (!javaType) {
      throw new Error(`Unable to convert ${sqlType} to a Java data type.`) 
    }
    return javaType
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
      const type = attribute.type as SQLDataType;
      const javaType = convertSqlToJavaDataType(type);
      if (!javaType) {
        throw new Error(`No or invalid type supplied for attribute: ${JSON.stringify(attribute)}`)
      }
      const pascalIdType = pascal(javaType)
      const camelName = camel(attribute.name)
      return `private ${pascalIdType} ${camelName};`
    }).join('\n    ')
  }

  public createService() {
    if (!this.idAttribute || !this.idAttribute.type) {
      throw new Error('An id attribute is required to create a controller')
    }
    const camelIdName = camel(this.idAttribute.name)
    const pascalIdName = pascal(this.idAttribute.name)
    const pascalIdType = pascal(this.findIdType())
    const pascalName = pascal(this.entity.name);
    const pascalPlural = pascal(plural(this.entity.name));
    const camelName = camel(this.entity.name);
    return `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ${pascalName}Service {
  private final ${pascalName}Repository ${camelName}Repository;

  @Autowired
  public ${pascalName}Service(${pascalName}Repository ${camelName}Repository) {
      this.${camelName}Repository = ${camelName}Repository;
  }

  public ${pascalName} create${pascalName}(${pascalName} ${camelName}) {
      return ${camelName}Repository.save(${camelName});
  }

  public Page<${pascalName}> getAll${pascalPlural}(Pageable pageable) {
      return ${camelName}Repository.findAll(pageable);
  }

  public Optional<${pascalName}> get${pascalName}By${pascalIdName}(${pascalIdType} ${camelIdName}) {
      return ${camelName}Repository.findBy${pascalIdName}(${camelIdName});
  }

  public ${pascalName} update${pascalName}(${pascalIdType} ${camelIdName}, ${pascalName} updated${pascalName}) {
      if (${camelName}Repository.existsBy${pascalIdName}(${camelIdName})) {
          updated${pascalName}.set${pascalIdName}(${camelIdName});
          return ${camelName}Repository.save(updated${pascalName});
      }
      throw new RuntimeException("${pascalName} not found with ${camelIdName}: " + ${camelIdName});
  }

  public void delete${pascalName}(${pascalIdType} ${camelIdName}) {
      if (${camelName}Repository.existsBy${pascalIdName}(${camelIdName})) {
          ${camelName}Repository.deleteBy${pascalIdName}(${camelIdName});
      } else {
          throw new RuntimeException("${pascalName} not found with ${camelIdName}: " + ${camelIdName});
      }
  }
}`
  }

  public createRepository(): string {
    const pascalName = pascal(this.entity.name);
    const idType = this.findIdType();
    return `import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ${pascalName}Repository extends PagingAndSortingRepository<${pascalName}, ${idType}> {

}
`
  }

  public createController() : string {
    if (!this.idAttribute || !this.idAttribute.type) {
      throw new Error('An id attribute is required to create a controller')
    }
    const camelIdName = camel(this.idAttribute.name)
    const pascalIdName = pascal(this.idAttribute.name)
    const pascalIdType = pascal(this.findIdType())
    const kebabName = kebab(this.entity.name)
    const pascalName = pascal(this.entity.name)
    const pascalPlural = pascal(plural(this.entity.name))
    const camelPlural = camel(plural(this.entity.name))
    const camelName = camel(this.entity.name);
    // Controller Class with CRUD endpoints
  return `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/${kebabName}")
public class ${pascalName}Controller {
    private final ${pascalName}Service ${camelName}Service;

    @Autowired
    public ${pascalName}Controller(${pascalName}Service ${camelName}Service) {
        this.${camelName}Service = ${camelName}Service;
    }

    @PostMapping
    public ResponseEntity<${pascalName}> create${pascalName}(@RequestBody ${pascalName} ${camelName}) {
        ${pascalName} created${pascalName} = ${camelName}Service.create${pascalName}(${camelName});
        return ResponseEntity.ok(created${pascalName});
    }

    @GetMapping
    public ResponseEntity<Page<${pascalName}>> getAll${pascalPlural}(Pageable pageable) {
        Page<${pascalName}> ${camelPlural} = ${camelName}Service.getAll${pascalPlural}(pageable);
        return ResponseEntity.ok(${camelPlural});
    }

    @GetMapping("/{${camelIdName}}")
    public ResponseEntity<${pascalName}> get${pascalName}By${pascalIdName}(@PathVariable ${pascalIdType} ${camelIdName}) {
        return ${camelName}Service.get${pascalName}By${pascalIdName}(${camelIdName})
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{${camelIdName}}")
    public ResponseEntity<${pascalName}> update${pascalName}(@PathVariable ${pascalIdType} ${camelIdName}, @RequestBody ${pascalName} updated${pascalName}) {
        ${pascalName} ${camelName} = ${camelName}Service.update${pascalName}(${camelIdName}, updated${pascalName});
        return ResponseEntity.ok(${camelName});
    }

    @DeleteMapping("/{${camelIdName}}")
    public ResponseEntity<Void> delete${pascalName}(@PathVariable ${pascalIdType} ${camelIdName}) {
        ${camelName}Service.delete${pascalName}(${camelIdName});
        return ResponseEntity.noContent().build();
    }
}`

  }

}


function isInvalidEntity(entity: Entity) {
  return !entity.name || !entity.attributes || entity.attributes.some(attr => {
    return !attr.name || !attr.type || !attr.hasOwnProperty('isId');
  });
}

