import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toEqual(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toEqual(
      1,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toEqual(
      6,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 6, action: Action.Exponentiate }),
    ).toEqual(64);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 6, action: 'Bad action' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'str', b: 6, action: Action.Multiply }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 2, b: 'str', action: Action.Multiply }),
    ).toBeNull();
  });
});
