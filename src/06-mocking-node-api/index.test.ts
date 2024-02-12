import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    const ms = 1000;

    doStuffByTimeout(cb, ms);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(cb, ms);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    const ms = 1000;

    doStuffByTimeout(cb, ms);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(ms);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(cb, ms);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();
    const ms = 1000;

    doStuffByInterval(cb, ms);

    jest.advanceTimersByTime(ms);

    expect(setInterval).toHaveBeenCalledWith(cb, ms);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();
    const ms = 1000;

    doStuffByInterval(cb, ms);

    jest.advanceTimersByTime(ms);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(cb, ms);

    doStuffByInterval(cb, ms);

    jest.advanceTimersByTime(ms);

    expect(setInterval).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenCalledWith(cb, ms);
  });
});

jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
