#!/usr/bin/env node

import fs from 'fs';
import run from './main';

const filename = process.argv[2];
if (!filename) throw new Error(`Error: Please provide a .if file.`);

const code = fs.readFileSync(filename).toString();

console.log(run(code));
