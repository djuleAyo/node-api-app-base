import { Request, Response } from "express";
import { errorObject, signToken, reduceValidationResults } from "../../util";
import { Person } from "../models/Person.model";

export const personController = {
  post: async (req: Request, res: Response) => {
    
    console.log(req.body);

    let errors = reduceValidationResults(Person.validate(req.body));
    if (errors) throw errorObject(errors);

    let old = Person.findOne({where: {email: req.body.email}});
    if (old) throw new Error('Person with given email already exists.');

    let person = await Person.create(req.body);

    return { token: signToken({id: person.id}) };
  },
  get: async (req: Request, res: Response) => {

  },
  login: async (req: Request, res: Response) => {

  }
}