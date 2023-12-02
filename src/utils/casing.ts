function _toWords(str: string) {
    const regex = /([A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+)/g;
    return str.match(regex) || [];
  }
  
  function _toCamelCase(words: string[]) {
    return (
      words[0].toLowerCase() +
      words
        .slice(1)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    );
  }
  
  function _toKebabCase(words: string[]) {
    return words.join('-').toLowerCase();
  }
  
  function _toLowerCase(words: string[]) {
    return words.join('').toLowerCase();
  }
  
  function _toPascalCase(words: string[]) {
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
  
  function _toSnakeCase(words: string[]) {
    return words.join('_').toLowerCase();
  }
  
  export function camel(str: string) {
    const words = _toWords(str);
    return _toCamelCase(words);
  }
  
  export function lower(str: string) {
    const words = _toWords(str);
    return _toLowerCase(words);
  }
  
  export function kebab(str: string) {
    const words = _toWords(str);
    return _toKebabCase(words);
  }
  
  export function pascal(str: string) {
    const words = _toWords(str);
    return _toPascalCase(words);
  }
  
  export function toSnakeCase(str: string) {
    const words = _toWords(str);
    return _toSnakeCase(words);
  }
  
  interface Rule {
    pattern: RegExp,
    replacement: string
  }

  export function plural(singular: string) {
    const rules: Rule[] = [
      {pattern: /quiz$/i, replacement: 'zes'} as Rule,
      {pattern: /([^aeiouy]|qu)y$/i, replacement: '$1ies'} as Rule,
      {pattern: /([sxz])$/i, replacement:'$1es'}  as Rule,
      {pattern: /$/, replacement:'s'} as Rule,
    ];
  
    for (const rule of rules) {
      if (rule.pattern.test(singular)) {
        return singular.replace(rule.pattern, rule.replacement);
      }
    }
  
    return singular + 's';
  }
  