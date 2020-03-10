import request from 'supertest';
const req = request;
import { app, appInited } from '..';
import { restoreToSeed, db } from '../db';
import { assert } from 'chai'
import { verifyToken } from '../../util';
import { Person } from '../models/Person.model';
import * as jwt from 'jsonwebtoken';

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

let register = (obj: any, status: number) => request(app).post('/person').send(obj).expect(status);
let getSelf = (person: Person, token: string) =>
  request(app).get(`/person/${person.id}`).set('Authorization', `Bearer ${token}`);

let login = (data: object) => request(app).post('/person/login').send(data);

before(async () => {
  await appInited;
});
beforeEach(async () => {
  await restoreToSeed();
});
describe('POST person', () => {

  it('should get token', async function () {
    let res = await register(personValidData, 200);
    assert.isTrue(!!verifyToken(res.body.token));
  });
  it('should should get the person', async function () {
    let res = await register(personValidData, 200);
    assert.deepNestedInclude(res.body.person, personValidData);
  });
  it('should have validation that returns all errors', async function () {
    let res = await register(personInvalidData3, 400)
    assert.equal(3, res.body.errors.length);
  });
  it('should have validation that returns all errors', async function () {
    let res = await register(personInvalidData6, 400);
    assert.equal(6, res.body.errors.length);
  });
  it('should not register already existing email', async function () {
    await register(personValidData, 200);
    let res2 = await register(personValidData, 400);
    assert.isTrue('error' in res2.body);
  });
});

describe('GET person', () => {
  it('should require authentification', async function() {
    let {person, token} = (await register(personValidData, 200)).body;
    let self = (await getSelf(person, token)).body;

    assert.deepEqual(person, self);
  });
  it('should return status 401 if invalid token', async function() {
    let {person, token} = (await register(personValidData, 200)).body;
    let res = await getSelf(person, '');
    assert.equal(res.status, 401);
  });

  describe('login', () => {
    it('should work with psswd and email', async function () {
      let {person, token} = (await register(personValidData, 200)).body;
      let res = await login({email: personValidData.email, psswd: personValidData.psswd});
      let protectedResource = await getSelf(person, res.body.token);

      assert(res.status === 200);
      assert(protectedResource.status === 200);
      assert.deepEqual(person, protectedResource.body);
      assert(!!verifyToken(token));
    });
    it('shouldnt work with wrong psswd', async function () {
      (await register(personValidData, 200)).body;
      let res = await login({email: personValidData.email, psswd: personValidData.psswd + 'a'});
      assert.equal(res.status, 401);
    });
    it('shouldnt work with unexisting email', async function () {
      (await register(personValidData, 200)).body;
      let res = await login({email: personValidData.email + 'a', psswd: personValidData.psswd});
      assert.equal(res.status, 401);
    });
  });
});