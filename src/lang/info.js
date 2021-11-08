// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements", "symbols": ["_", "statement"], "postprocess": 
        (data) => {
            return [data[1]];
        }
            },
    {"name": "statements", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", "statement"], "postprocess": 
        (data) => {
            return [...data[0], data[3]];
        }
            },
    {"name": "statement", "symbols": ["var_declare_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["var_declare"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "statement", "symbols": ["for_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["while_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["if_condition"], "postprocess": id},
    {"name": "for_loop$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "for_loop$ebnf$1", "symbols": ["for_loop$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "for_loop$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "for_loop", "symbols": [(lexer.has("kfor") ? {type: "kfor"} : kfor), "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "__", (lexer.has("kin") ? {type: "kin"} : kin), "__", (lexer.has("range") ? {type: "range"} : range), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expr", "_", (lexer.has("delim") ? {type: "delim"} : delim), "_", "expr", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "for_loop$ebnf$1", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), (lexer.has("lbrace") ? {type: "lbrace"} : lbrace)], "postprocess": 
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
                },
    {"name": "while_loop$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "while_loop$ebnf$1", "symbols": ["while_loop$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "while_loop$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "while_loop", "symbols": [(lexer.has("kwhile") ? {type: "kwhile"} : kwhile), "_", "expr", "_", "while_loop$ebnf$1", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace)], "postprocess": 
        (data) => {
            return {
                type: "while_loop",
                condition: data[2],
                code: data[8],
                line: data[0].line
            }
        }
                },
    {"name": "if_condition$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "if_condition$ebnf$1", "symbols": ["if_condition$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "if_condition$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_condition", "symbols": [(lexer.has("kif") ? {type: "kif"} : kif), "_", "expr", "_", "if_condition$ebnf$1", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace)], "postprocess": 
        (data) => {
            return {
                type: "if_condition",
                condition: data[2],
                code: data[8],
                line: data[0].line
            }
        }
                },
    {"name": "if_condition$ebnf$2$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "if_condition$ebnf$2", "symbols": ["if_condition$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "if_condition$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_condition", "symbols": [(lexer.has("kelse") ? {type: "kelse"} : kelse), "__", (lexer.has("kif") ? {type: "kif"} : kif), "_", "expr", "_", "if_condition$ebnf$2", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace)], "postprocess": 
        (data) => {
            return {
                type: "else_if_condition",
                condition: data[4],
                code: data[10],
                line: data[0].line
            }
        }
                },
    {"name": "if_condition$ebnf$3$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "if_condition$ebnf$3", "symbols": ["if_condition$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "if_condition$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_condition", "symbols": [(lexer.has("kelse") ? {type: "kelse"} : kelse), "_", "if_condition$ebnf$3", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace)], "postprocess": 
        (data) => {
            return {
                type: "else_condition",
                code: data[6],
                line: data[0].line
            }
        }
                },
    {"name": "var_declare_assign", "symbols": [(lexer.has("def") ? {type: "def"} : def), "_", "assign_list"], "postprocess": 
        (data) => {
            return {
                type: "var_declare_assign",
                assign_list: data[2],
                line: data[0].line,
            }
        }
                },
    {"name": "var_declare", "symbols": [(lexer.has("def") ? {type: "def"} : def), "__", "var_list"], "postprocess": 
        (data) => {
            return {
                type: "var_declare",
                var_list: data[2],
                line: data[0].line,
            }
        }
                },
    {"name": "var_list", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "var_list", "symbols": ["var_list", "__", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "var_assign", "symbols": [(lexer.has("set") ? {type: "set"} : set), "__", "assign_list"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                assign_list: data[2],
                line: data[0].line,
            }
        }
                },
    {"name": "assign_list", "symbols": ["assign"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "assign_list", "symbols": ["assign_list", "_", (lexer.has("delim") ? {type: "delim"} : delim), "_", "assign"], "postprocess": 
        (data) => {
            return [...data[0], data[4]];
        }
                },
    {"name": "assign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "assign",
                var_name: data[0],
                value: data[4],
            }
        }
                },
    {"name": "fun_call$ebnf$1$subexpression$1", "symbols": ["arg_list"]},
    {"name": "fun_call$ebnf$1", "symbols": ["fun_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "fun_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fun_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "fun_call$ebnf$1", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "fun_call",
                fun_name: data[0],
                arguments: data[4] ? data[4][0] : [],
                line: data[0].line
            }
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", "_", (lexer.has("delim") ? {type: "delim"} : delim), "_", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[4]];
        }
                },
    {"name": "expr", "symbols": ["exp"], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expr", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "expression",
                value: [data[0], Array.isArray(data[2]) ? [...data[2]] : data[2], data[4]]
            }
        }
                },
    {"name": "exp", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "exp", "symbols": ["operation"], "postprocess": id},
    {"name": "exp", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "exp", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "exp", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "exp", "symbols": ["fun_call"], "postprocess": id},
    {"name": "operation", "symbols": ["expr", "_", (lexer.has("op") ? {type: "op"} : op), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "operation",
                exp1: data[0],
                exp2: data[4],
                op: data[2].value,
            };
        }
                },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
