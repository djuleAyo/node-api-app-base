import { Request, Response, NextFunction } from "express";
import { errObj, signToken, reduceValidationResults, errMsg, stringify } from "../../util";
import { Person } from "../models/Person.model";

export const personController = {
   post: async (req: Request, res: Response, next: NextFunction) => {
    let errors = reduceValidationResults(Person.validate(req.body));
    if (errors) return next(errObj({errors, status: 400}));

    let old = await Person.findOne({where: {email: req.body.email}});
    if (old) return next(errObj({error: 'Person with given email already exists.', status: 400}));

    let person = await Person.create(req.body);

    res.json({ token: signToken({id: person.id}), person });
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    
    let {id} = req.params;
    if (!id) return next(errMsg('Must provide a person id.'));

    const person = await Person.findByPk(id);
    if (!person) return next(errObj({ status: 404, msg: 'Person not found.'}));

    res.status(200).json(person);
  },
  login: async (req: Request, res: Response) => {
    res.json({token: signToken({id: (req as any).user.id})});
  }
}