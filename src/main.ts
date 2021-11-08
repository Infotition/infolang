import nearley from 'nearley';
import grammar from './lang/info.js';

function parse(editorCode: string) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(editorCode);

  if (parser.results.length >= 1) return parser.results[0];
  return null;
}

function generateLine(node: any): any {
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
            `${assign.var_name.value} = ${generateLine(assign.value)};`
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
      return `${node.fun_name.value}(${argList})`;
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
}

function generateCode(statements: any) {
  return statements.map((statement: any) => generateLine(statement)).join('\n');
}

async function generate(statements: any) {
  const runtime = `let count = 0;
const print=(...args)=>console.log({step:count,log:[...args].join(" ")});
const step=(num)=>{count++;return true;}
const sqrt=(x)=>Math.sqrt(x);
const abs=(x)=>x>=0?x:-x;
const sign=(x)=>x>=0?(x>0?1:0):-1;
`;

  return `${runtime}\n${generateCode(statements)}`;
}

async function run(editorCode: string) {
  return eval(await generate(parse(editorCode)));
}

export default run;
