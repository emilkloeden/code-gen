export type SQLDataType = 'int' | 'integer' | 'bigint' | 'smallint' | 'real' | 'float' | 'double' | 'decimal' | 'numeric' | 'nchar' | 'char' | 'varchar' | 'nvarchar' | 'tinyint' | 'bit' | 'date' | 'datetime' | 'binary' | 'varbinary' | 'image';
export type JavaDataType =  'Integer' | 'Long' | 'Short' | 'Float' | 'Double' | 'BigDecimal' | 'String' | 'Byte' | 'Boolean' | 'Date' | 'Byte[]';

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

  

export function convertSqlToJavaDataType(sqlDataType: SQLDataType) {
  return sqlToJavaDataType.get(sqlDataType);
}