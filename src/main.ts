import nearley from 'nearley';
import grammar from './lang/info.js';

/**
 * Parses the infolang syntax into an abstract syntax tree.
 *
 * @param {string} code Code as string to parse.
 * @return {*} Returns a object representing the AST.
 * @throws No parse found error
 */
const parse = (code: string): any => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  try {
    parser.feed(code);
    return parser.results[0];
  } catch (err: any) {
    return {
      status: 'error',
      error_code: 0,
      error_type: 'syntax error',
      line: err.token.line,
    };
  }
};

/**
 * Generates the javascript representation of the given AST node.
 *
 * @param {*} node Single AST node
 * @return {string}  {string}
 */
const generateLine = (node: any): string => {
  switch (node.type) {
    case 'string':
    case 'lparen':
    case 'rparen':
    case 'number':
    case 'float':
    case 'identifier':
      return node.value;

    case 'var_declare_assign': {
      const assigList = node.assign_list
        .map(
          (assign: any) =>
            `${assign.var_name.value}=${generateLine(assign.value)}`
        )
        .join(',');
      return `step(${node.line});let ${assigList};`;
    }

    case 'var_assign': {
      const assignList = node.assign_list
        .map(
          (assign: any) =>
            `${assign.var_name.value}=${generateLine(assign.value)};`
        )
        .join('\n');

      return `step(${node.line});${assignList}`;
    }

    case 'var_declare': {
      const varList = node.var_list
        .map((variable: any) => generateLine(variable))
        .join(',');
      return `step(${node.line});let ${varList};`;
    }

    case 'for_loop': {
      const code = node.code.map((ln: any) => generateLine(ln)).join('\n');
      const variable = generateLine(node.var);
      return `for (let ${variable} = ${generateLine(
        node.from
      )}; ${variable} <= ${generateLine(node.to)}; i++) {\nstep(${
        node.line
      });${code}\n}`;
    }

    case 'while_loop': {
      const code6 = node.code.map((ln: any) => generateLine(ln)).join('\n');
      return `while${generateLine(node.condition)} {\n${code6}\n}`;
    }

    case 'fun_call': {
      const argList = node.arguments
        .map((arg: any) => generateLine(arg))
        .join(',');
      return `${node.fun_name.value}(${node.line},${argList})`;
    }

    case 'expression':
      return node.value.map((arg: any) => generateLine(arg)).join('');

    case 'operation':
      if (node.op === '~')
        return `Math.pow(${generateLine(node.exp1)},${generateLine(
          node.exp2
        )})`;
      if (node.op === 'mod')
        return `${generateLine(node.exp1)}%${generateLine(node.exp2)}`;
      if (node.op === 'is')
        return `${generateLine(node.exp1)}===${generateLine(node.exp2)}`;
      if (node.op === 'and')
        return `${generateLine(node.exp1)}&&${generateLine(node.exp2)}`;
      if (node.op === 'not')
        return `${generateLine(node.exp1)}!==${generateLine(node.exp2)}`;
      return `${generateLine(node.exp1)}${node.op}${generateLine(node.exp2)}`;

    case 'if_condition': {
      const code = node.code.map((ln: any) => generateLine(ln)).join('\n');
      return `step(${node.line});if ${generateLine(
        node.condition
      )} {\n${code}\n}`;
    }

    case 'else_if_condition': {
      const code = node.code.map((ln: any) => generateLine(ln)).join('\n');
      return `else if (step(${node.line})&&${generateLine(
        node.condition
      )}) {step(${node.line});\n${code}\n}`;
    }

    case 'else_condition': {
      const code = node.code.map((ln: any) => generateLine(ln)).join('\n');
      return `else {\n${code}\n}`;
    }

    default:
      throw new Error(`Error: Unhandled AST node type ${node.type}.`);
  }
};

/**
 * Generates javascript code from complete AST.
 *
 * @param {*} statements The abstract syntax tree as object.
 * @return {string} {string}
 */
const generate = (statements: any): string => {
  const compiledCode = statements
    .map((statement: any) => generateLine(statement))
    .join('\n');

  return `
const logs=[];
const steps=[];
let count = 0;
let ops = 0;
let start, end;

const print=(l, ...args)=>{step(l);logs.push({step:count,log:[...args].join(" ")});}
const step=(num)=>{ops++;if(steps[count - 1]!==num){steps.push(num);count++;}if(ops>5000)throw new Error("timeout");return true;}

const sqrt=(l,x)=>{step(l);return Math.sqrt(x);}
const abs=(l,x)=>{step(l);return x>=0?x:-x;}
const sign=(l,x)=>{step(l);return x>=0?(x>0?1:0):-1;}

function main() {
${compiledCode}
return {logs, steps};
}
main()
`;
};

/**
 * Calculates the length of the string without whitespaces.
 *
 * @param {string} str - String to count length.
 * @return {*} number
 */
const calculateLength = (str: string): number => {
  const whitespaces = [' ', '\n'];

  let count = 0;
  for (let i = 0, len = str.length; i < len; i += 1) {
    if (!whitespaces.includes(str[i])) count += 1;
  }

  return count;
};

/**
 * Runs the infolang code and returns the output.
 *
 * @param {string} editorCode
 * @return {*}
 */
const run = (editorCode: string): any => {
  const ast = parse(editorCode);

  if (ast?.status === 'error') return ast;

  if (ast) {
    try {
      return {
        status: 'success',
        length: calculateLength(editorCode),
        result: eval(generate(ast)),
      };
    } catch (err) {
      return {
        status: 'error',
        error_code: 2,
        error_type: 'timeout',
      };
    }
  }

  return {
    status: 'error',
    error_code: 1,
    error_type: 'parsing error',
  };
};

export default run;
