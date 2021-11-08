import { ping } from './main';

test('ping', () => {
  expect(ping()).toBe('pong!');
});
