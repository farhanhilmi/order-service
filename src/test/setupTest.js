import { jest } from '@jest/globals';

import db from './db.js';

beforeAll(async () => {
  jest.setTimeout(60000);
  await db.connect();
});

// beforeEach(async () => {
//   await seedDatabase();
// });

// afterEach(async () => {
//   await db.clear();
// });

afterAll(async () => {
  await db.close();
});
