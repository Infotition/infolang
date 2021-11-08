@{%
    const moo = require('moo');
    let lexer = moo.compile({
        WS:      /[ \t]+/,
        comment: /\/\/.*?$/,
        float: /(?:0|[1-9][0-9]*)\.[0-9]+/,
        number:  /0|[1-9][0-9]*/,
        string:  /"(?:\\["\\]|[^\n"\\])*"/,
        lparen:  '(',
        rparen:  ')',
        rbrace:  '{',
        lbrace:  '}',
        op:     /[\+\-\*\/\~]|not|is|mod|and|or|>=|<=|>|</,
        assign:  '=',
        delim:   ",",
        identifier: {match: /[a-zA-Z][a-zA-Z_0-9]*/, type: moo.keywords({
            'func': 'function',
            'def': 'def',
            'set': 'set',
            'kfor': 'for',
            'kin': 'in',
            'range': 'range',
            'kif': 'if',
            'kelse': 'else',
            'kwhile': 'while',
        })},
        NL:      { match: /\r\n?|\n/, lineBreaks: true },
    });
%}

@lexer lexer

statements
    -> _ statement
    {%
        (data) => {
            return [data[1]];
        }
    %}
    |  statements %NL _ statement
    {%
        (data) => {
            return [...data[0], data[3]];
        }
    %}

statement
    -> var_declare_assign   {% id %}
    |  var_assign           {% id %}
    |  var_declare          {% id %}
    |  fun_call             {% id %}
    |  for_loop             {% id %}
    |  while_loop           {% id %}
    |  if_condition         {% id %}

for_loop
    -> %kfor __ %identifier __ %kin __ %range _ %lparen _ expr _ %delim _ expr _ %rparen _ (%NL):? %rbrace %NL statements %NL %lbrace
        {%
            (data) => {
                return {
                    type: "for_loop",
                    var: data[2],
                    from: data[10],
                    to: data[14],
                    code: data[21],
                    line: data[0].line
                }
            }
        %}

while_loop
    -> %kwhile _ expr _ (%NL):? _ %rbrace %NL statements %NL _ %lbrace
        {%
            (data) => {
                return {
                    type: "while_loop",
                    condition: data[2],
                    code: data[8],
                    line: data[0].line
                }
            }
        %}

if_condition
    -> %kif _ expr _ (%NL):? _ %rbrace %NL statements %NL _ %lbrace
        {%
            (data) => {
                return {
                    type: "if_condition",
                    condition: data[2],
                    code: data[8],
                    line: data[0].line
                }
            }
        %}
    |  %kelse __ %kif _ expr _ (%NL):? _ %rbrace %NL statements %NL _ %lbrace
        {%
            (data) => {
                return {
                    type: "else_if_condition",
                    condition: data[4],
                    code: data[10],
                    line: data[0].line
                }
            }
        %}
    |  %kelse _ (%NL):? _ %rbrace %NL statements %NL _ %lbrace
        {%
            (data) => {
                return {
                    type: "else_condition",
                    code: data[6],
                    line: data[0].line
                }
            }
        %}

var_declare_assign
    -> %def _ assign_list
        {%
            (data) => {
                return {
                    type: "var_declare_assign",
                    assign_list: data[2],
                    line: data[0].line,
                }
            }
        %}

var_declare
    -> %def __ var_list
        {%
            (data) => {
                return {
                    type: "var_declare",
                    var_list: data[2],
                    line: data[0].line,
                }
            }
        %}

var_list
    -> %identifier
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | var_list __ %identifier
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}

var_assign
    -> %set __ assign_list
        {%
            (data) => {
                return {
                    type: "var_assign",
                    assign_list: data[2],
                    line: data[0].line,
                }
            }
        %}

assign_list
    -> assign
        {%
            (data) => {
                return [data[0]];
            }
        %}
    | assign_list _ %delim _ assign
        {%
            (data) => {
                return [...data[0], data[4]];
            }
        %}

assign
    -> %identifier _ %assign _ expr
        {%
            (data) => {
                return {
                    type: "assign",
                    var_name: data[0],
                    value: data[4],
                }
            }
        %}

fun_call
    -> %identifier _ %lparen _ (arg_list):? _ %rparen
        {%
            (data) => {
                return {
                    type: "fun_call",
                    fun_name: data[0],
                    arguments: data[4] ? data[4][0] : [],
                    line: data[0].line
                }
            }
        %}

arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  arg_list _ %delim _ expr
        {%
            (data) => {
                return [...data[0], data[4]];
            }
        %}

expr
    -> exp {% id %}
    |  %lparen _ expr _ %rparen
        {%
            (data) => {
                return {
                    type: "expression",
                    value: [data[0], Array.isArray(data[2]) ? [...data[2]] : data[2], data[4]]
                }
            }
        %}

exp
    -> %string      {% id %}
    |  operation    {% id %}
    |  %float       {% id %}
    |  %number      {% id %}
    |  %identifier  {% id %}
    |  fun_call     {% id %}

operation
    -> expr _ %op _ expr
        {%
            (data) => {
                return {
                    type: "operation",
                    exp1: data[0],
                    exp2: data[4],
                    op: data[2].value,
                };
            }
        %}

_ -> %WS:*

__ -> %WS:+
