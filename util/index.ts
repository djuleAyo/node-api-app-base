import * as jwt from 'jsonwebtoken';

export function errObj(obj: object) {
  return new Error(stringify(obj));
}

export function errMsg(msg: string) {
  return new Error(msg);
}

export function stringify(obj: object) {
  return JSON.stringify(obj, null, 2);
}

export function signToken(payload: object) {
  let conf = {
    exp: Math.floor(Date.now() / 1000) + 10
  }
  return jwt.sign(payload, constants.jwtSecret)
}

export let constants = {
  emailRegex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  jwtSecret: 'aosetnuh'
}

export function reduceValidationResults(validationResults: any) {
  let errors = validationResults.filter((x: any) => !x[0]).map((x: any) => x[1]);
  return errors.length ? errors : undefined;
}