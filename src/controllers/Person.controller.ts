import { Request, Response, NextFunction } from "express";
import { errObj, signToken, reduceValidationResults, errMsg } from "../../util";
import { Person } from "../models/Person.model";

export const personController = {
   post: async (req: Request, res: Response, next: NextFunction) => {
    
    let errors = reduceValidationResults(Person.validate(req.body));
    if (errors) next(errObj(errors));

    let old = await Person.findOne({where: {email: req.body.email}});
    if (old) next(errMsg('Person with given email already exists.'));

    let person = await Person.create(req.body);

    res.json({ token: signToken({id: person.id}) });
  },
  get: async (req: Request, res: Response) => {

  },
  login: async (req: Request, res: Response) => {

  }
}