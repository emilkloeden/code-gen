import type { SQLDataType } from "src/utils/typemappings";

export interface Attribute {
  name: string;
  type: SQLDataType;
  isId: boolean;
}

export interface Entity {
  name: string;
  attributes: Attribute[];
}
