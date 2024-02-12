import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts');

    expect(spy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  const relativePath = '/posts';

  test('should perform request to correct provided url', async () => {
    const axiosInstance = axios.create();
    const spy = jest.spyOn(axiosInstance, 'get');

    await throttledGetDataFromApi(relativePath);

    expect(spy);
  });

  test('should return response data', async () => {
    const expectedResponse = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    const response = await throttledGetDataFromApi('/todos/1');
    expect(response).toEqual(expectedResponse);
  });
});
