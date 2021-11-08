import run from './main';

test('should print string', () => {
  expect(run('print("Hello World")')).toEqual({
    length: 19,
    result: { logs: [{ log: 'Hello World', step: 1 }], steps: [1] },
    status: 'success',
  });
});

test('should print variable content', () => {
  expect(
    run(['def name', 'set name = "Tobias"', 'print(name)'].join('\n'))
  ).toEqual({
    length: 34,
    result: { logs: [{ log: 'Tobias', step: 3 }], steps: [1, 2, 3] },
    status: 'success',
  });
});

test('should calculate corretcly', () => {
  expect(
    run(
      [
        'def x1 = 4',
        'def y1 = 8',
        'def x2 = 5',
        'def y2 = 12',
        'def dist = sqrt((((x1 - x2) ~ 2) + ((y1 - y2) ~ 2)))',
        'print("The distance is", dist)',
      ].join('\n')
    )
  ).toEqual({
    length: 95,
    result: {
      logs: [{ log: 'The distance is 4.123105625617661', step: 6 }],
      steps: [1, 2, 3, 4, 5, 6],
    },
    status: 'success',
  });
});

test('should multi create var', () => {
  expect(
    run(
      [
        'def x1 = 4 + 3 + 2, y1 = 8, x2 = 5, y2 = 12',
        'def dist = sqrt((((x1 - x2) ~ 2) + ((y1 - y2) ~ 2)))',
        'print("The distance is", dist)',
      ].join('\n')
    )
  ).toEqual({
    length: 93,
    result: {
      logs: [{ log: 'The distance is 5.656854249492381', step: 3 }],
      steps: [1, 2, 3],
    },
    status: 'success',
  });
});

test('should calculate fakulty', () => {
  expect(
    run(
      [
        'def fak = 1, n = 10',
        'for i in range(1, n) {',
        '    set fak = fak * i',
        '}',
        'print(fak)',
      ].join('\n')
    )
  ).toEqual({
    length: 53,
    result: {
      logs: [{ log: '3628800', step: 22 }],
      steps: [1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 5],
    },
    status: 'success',
  });
});

test('should simulate fizz buzz', () => {
  expect(
    run(
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
      ].join('\n')
    )
  ).toEqual({
    length: 139,
    result: {
      logs: [
        { log: '1', step: 6 },
        { log: '2', step: 11 },
        { log: 'Fizz', step: 15 },
        { log: '4', step: 20 },
        { log: 'Buzz', step: 25 },
        { log: 'Fizz', step: 29 },
        { log: '7', step: 34 },
        { log: '8', step: 39 },
        { log: 'Fizz', step: 43 },
        { log: 'Buzz', step: 48 },
        { log: '11', step: 53 },
        { log: 'Fizz', step: 57 },
        { log: '13', step: 62 },
        { log: '14', step: 67 },
        { log: 'FizzBuzz', step: 70 },
        { log: '16', step: 75 },
        { log: '17', step: 80 },
        { log: 'Fizz', step: 84 },
        { log: '19', step: 89 },
        { log: 'Buzz', step: 94 },
      ],
      steps: [
        1, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6,
        9, 10, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6,
        9, 10, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3,
        4, 2, 3, 6, 9, 13, 2, 3, 6, 9, 13, 2, 3, 6, 7, 2, 3, 6, 9, 13, 2, 3, 6,
        9, 10,
      ],
    },
    status: 'success',
  });
});

test('should work with combined conditions', () => {
  expect(
    run(
      [
        'def age = 18, height = 175',
        'if ((age >= 18) and (height < 180)) {',
        '    print("Du darfst fahren.")',
        '}',
        'else {',
        '    print("Du darfst nicht fahren.")',
        '}',
        'if (age not 18) {',
        '    print("Du bist nicht 18.")',
        '}',
      ].join('\n')
    )
  ).toEqual({
    length: 146,
    result: {
      logs: [{ log: 'Du darfst fahren.', step: 3 }],
      steps: [1, 2, 3, 8],
    },
    status: 'success',
  });
});

test('should calculate heron', () => {
  expect(
    run(
      [
        'def n = 2, a = 16',
        'def prev = 0, curr = 1, eps = 0.00001',
        'while (abs(curr - prev) > eps) {',
        '    set prev = curr, curr = (((n - 1) * (prev ~ n) + a) / (n * (prev ~ (n - 1))))',
        '}',
        'print(curr)',
      ].join('\n')
    )
  ).toEqual({
    length: 132,
    result: {
      logs: [{ log: '4.000000000000051', step: 16 }],
      steps: [1, 2, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 6],
    },
    status: 'success',
  });
});

test('should error with infinite loop', () => {
  expect(run(['while (1 is 1) {', '  def n = 2', '}'].join('\n'))).toEqual({
    error_code: 2,
    error_type: 'timeout',
    status: 'error',
  });
});
