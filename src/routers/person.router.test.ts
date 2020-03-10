import request from 'supertest';
const req = request;
import { app, appInited } from '..';
import { restoreToSeed } from '../db';
import { assert } from 'chai'
import { verifyToken } from '../../util';

let personValidData = {
  email: 'test@email.com',
  name: 'NameTest Name',
  psswd: 'ValidPass1'
};

let personInvalidData3 = {
  email: 'testemail.com',
  name: '',
  psswd: 'ValidPass'
};

let personInvalidData6 = {};

let r = (obj: any, status: number) => request(app).post('/person').send(obj).expect(status);

describe('POST person', () => {
  before(async () => {
    await appInited;
  });
  beforeEach(async () => {
    await restoreToSeed();
  });

  it('should get token', async () => {
    let res = await r(personValidData, 200);
    assert.isTrue(!!verifyToken(res.body.token))
  });
  it('should should get the person', async () => {
    let res = await r(personValidData, 200);
    assert.deepNestedInclude(res.body.person, personValidData);
  });
  it('should have validation that returns all errors', async () => {
    let res = await r(personInvalidData3, 400)
    assert.equal(3, res.body.errors.length);
  });

  it('should have validation that returns all errors', async () => {
    let res = await r(personInvalidData6, 400);
    assert.equal(6, res.body.errors.length);
  });
  it('should not register already existing email', async () => {
    await r(personValidData, 200);
    let res2 = await r(personValidData, 400);

    assert.isTrue('error' in res2.body);
  });
});