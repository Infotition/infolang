<div align="center">
	<br />
	<p>
		<a href="http://infotition.de">
			<img src="https://imgur.com/97bMQWK.png" width=600px alt="infotition logo" />
		</a>
	</p>
	<h1>Infolang</h1>
	<p>Infolang is a beginner friendly programming languages, designed for codeli.</p>
  <p><img src="https://github.com/Infotition/infolang/blob/main/img/example.png"></p>
	<p>
		<a href="https://github.com/Infotition/infolang/issues" title="github issues">
			<img alt="issues" src="https://img.shields.io/github/issues/Infotition/infolang">
		</a>
		<a href="https://github.com/Infotition/infolang/blob/main/LICENSE" title="license">
			<img src="https://img.shields.io/github/license/Infotition/infolang" alt="license" />
		</a>
		<a href="https://discord.gg/NpxrDGYDwV" title="discord">
			<img src="https://img.shields.io/discord/792139920260464670?color=7289da&logo=discord&logoColor=white" alt="discord server" />
		</a>
	</p>
	<br>
</div>

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Errors](#errors)
  - [Invalid Syntax](#invalid-syntax)
  - [Infinite Loop](#infinite-loop)
- [Issue Reporting](#issue-reporting)
- [Contribution](#contribution)
- [License](#license)

# Installation

This Project uses [npm](https://www.npmjs.com) as it's package manager. Make sure you have installed it.

You can install infolang with npm:
```
npm install infolang
```

# Getting Started

Now you have access to the `run` function.
```javascript
import run from 'infolang';

const out = run(
  [
    'def n = 20',
    'for i in range(1, n) {',
    '  if ( (i mod 15) is 0 ) {',
    '    print("FizzBuzz")',
    '  }',
    '  else if ( (i mod 3) is 0 ) {',
    '    print("Fizz")',
    '  }',
    '  else if ( (i mod 5) is 0 ) {',
    '    print("Buzz")',
    '  }',
    '  else {',
    '    print(i)',
    '  }',
    '}',
  ].join('\n');

  console.log(out);
)
```

The output of this example looks like this, where logs represent the `print()` calls and steps an list of lines, in which the code got executed.
```json
{
  "length": 139,
  "result": {
    "logs": [
      { "log": "1", "step": 6 },
      { "log": "2", "step": 11 },
      { "log": "Fizz", "step": 15 },
      { "log": "4", "step": 20 },
      { "log": "Buzz", "step": 25 },
      { "log": "Fizz", "step": 29 },
      { "log": "7", "step": 34 },
      { "log": "8", "step": 39 },
      { "log": "Fizz", "step": 43 },
      { "log": "Buzz", "step": 48 },
      { "log": "11", "step": 53 },
      { "log": "Fizz", "step": 57 },
      { "log": "13", "step": 62 },
      { "log": "14", "step": 67 },
      { "log": "FizzBuzz", "step": 70 },
      { "log": "16", "step": 75 },
      { "log": "17", "step": 80 },
      { "log": "Fizz", "step": 84 },
      { "log": "19", "step": 89 },
      { "log": "Buzz", "step": 94 },
    ],
    "steps": [
      1, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6,
      9, 10, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6,
      9, 10, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3,
      4, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6,
      9, 10,
    ],
  },
  "status": "success",
}
```

# Errors

## Invalid Syntax
```groovy
print(42)
def n = 42
print(n

```
```json
{
  "status": "error",
  "error_code": 0,
  "error_type": "syntax error",
  "line": 3,
}
```

## Infinite Loop
```groovy
while (1 is 1) {
  print(42)
}
```
```json
{
  "error_code": 2,
  "error_type": "timeout",
  "status": "error",
}
```

# Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. For other related questions/support please use the official Infotition [Discord server](https://discord.gg/NpxrDGYDwV).

# Contribution

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Infotition Code of Conduct guidelines](https://github.com/Infotition/infolang/blob/main/.github/CODE_OF_CONDUCT.md)
- [Infotition Contribution guidelines](https://github.com/Infotition/infolang/blob/main/.github/CONTRIBUTING.md)

# License

This repo is covered under the MIT License, see the [LICENSE](https://github.com/Infotition/infolang/blob/main/LICENSE) file for more information.
