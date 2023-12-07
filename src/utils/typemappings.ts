export type SQLDataType =
  | 'int'
  | 'integer'
  | 'bigint'
  | 'smallint'
  | 'real'
  | 'float'
  | 'double'
  | 'decimal'
  | 'numeric'
  | 'nchar'
  | 'char'
  | 'varchar'
  | 'nvarchar'
  | 'tinyint'
  | 'bit'
  | 'date'
  | 'datetime'
  | 'binary'
  | 'varbinary'
  | 'image';
export type JavaDataType =
  | 'Integer'
  | 'Long'
  | 'Short'
  | 'Float'
  | 'Double'
  | 'BigDecimal'
  | 'String'
  | 'Byte'
  | 'Boolean'
  | 'Date'
  | 'Byte[]';

export type TypescriptDataType = 'string' | 'number' | 'boolean' | 'Date' | 'Byte[]'

export type PythonDataType = 
| 'int'
| 'float'
| 'complex'
| 'bool'
| 'str'
| 'bytes'
| 'bytearray'
| 'datetime.datetime'
| 'datetime.date'
| 'decimal.Decimal'
| 'long'


export const sqlToJavaDataType: Map<SQLDataType, JavaDataType> = new Map();
sqlToJavaDataType.set('int', 'Integer');
sqlToJavaDataType.set('integer', 'Integer');
sqlToJavaDataType.set('bigint', 'Long');
sqlToJavaDataType.set('smallint', 'Short');
sqlToJavaDataType.set('real', 'Float');
sqlToJavaDataType.set('float', 'Float');
sqlToJavaDataType.set('double', 'Double');
sqlToJavaDataType.set('decimal', 'BigDecimal');
sqlToJavaDataType.set('numeric', 'BigDecimal');
sqlToJavaDataType.set('nchar', 'String');
sqlToJavaDataType.set('char', 'String');
sqlToJavaDataType.set('varchar', 'String');
sqlToJavaDataType.set('nvarchar', 'String');
sqlToJavaDataType.set('tinyint', 'Byte');
sqlToJavaDataType.set('bit', 'Boolean');
sqlToJavaDataType.set('date', 'Date');
sqlToJavaDataType.set('datetime', 'Date');
sqlToJavaDataType.set('binary', 'Byte[]');
sqlToJavaDataType.set('varbinary', 'Byte[]');
sqlToJavaDataType.set('image', 'Byte[]');

export const sqlToTypescriptDataType: Map<SQLDataType, TypescriptDataType> = new Map();
sqlToTypescriptDataType.set('int', 'number');
sqlToTypescriptDataType.set('integer', 'number');
sqlToTypescriptDataType.set('bigint', 'number');
sqlToTypescriptDataType.set('smallint', 'number');
sqlToTypescriptDataType.set('real', 'number');
sqlToTypescriptDataType.set('float', 'number');
sqlToTypescriptDataType.set('double', 'number');
sqlToTypescriptDataType.set('decimal', 'number');
sqlToTypescriptDataType.set('numeric', 'number');
sqlToTypescriptDataType.set('nchar', 'string');
sqlToTypescriptDataType.set('char', 'string');
sqlToTypescriptDataType.set('varchar', 'string');
sqlToTypescriptDataType.set('nvarchar', 'string');
sqlToTypescriptDataType.set('tinyint', 'number');
sqlToTypescriptDataType.set('bit', 'boolean');
sqlToTypescriptDataType.set('date', 'Date');
sqlToTypescriptDataType.set('datetime', 'Date');
sqlToTypescriptDataType.set('binary', 'Byte[]');
sqlToTypescriptDataType.set('varbinary', 'Byte[]');
sqlToTypescriptDataType.set('image', 'Byte[]');

const sqlToPythonDataType : Map<SQLDataType, PythonDataType> = new Map();
sqlToPythonDataType.set('int', 'int');
sqlToPythonDataType.set('integer', 'int');
sqlToPythonDataType.set('bigint', 'int');
sqlToPythonDataType.set('smallint', 'int');
sqlToPythonDataType.set('real', 'float');
sqlToPythonDataType.set('float', 'float');
sqlToPythonDataType.set('double', 'long');
sqlToPythonDataType.set('decimal', 'decimal.Decimal');
sqlToPythonDataType.set('numeric', 'int');
sqlToPythonDataType.set('nchar', 'str');
sqlToPythonDataType.set('char', 'str');
sqlToPythonDataType.set('varchar', 'str');
sqlToPythonDataType.set('nvarchar', 'str');
sqlToPythonDataType.set('tinyint', 'int');
sqlToPythonDataType.set('bit', 'bool');
sqlToPythonDataType.set('date', 'datetime.date');
sqlToPythonDataType.set('datetime', 'datetime.datetime');
sqlToPythonDataType.set('binary', 'bytearray');
sqlToPythonDataType.set('varbinary', 'bytearray');
sqlToPythonDataType.set('image', 'bytearray');



export function convertSqlToJavaDataType(sqlDataType: SQLDataType) {
  return sqlToJavaDataType.get(sqlDataType);
}

export function convertSqlToTypescriptDataType(sqlDataType: SQLDataType) {
  return sqlToTypescriptDataType.get(sqlDataType);
}


export function convertSqlToPythonDataType(sqlDataType: SQLDataType) {
  return sqlToPythonDataType.get(sqlDataType);
}
