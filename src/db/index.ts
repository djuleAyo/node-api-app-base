import {Sequelize} from 'sequelize-typescript';
import { Person } from '../models/Person.model';
 
export const db =  new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/storage.db',
  models: [__dirname + '/src/models'],
  logging: false
});

db.addModels([
  Person
]);


export async function restoreToSeed() {

  await db.sync({force: true});

  await Person.create({name: 'test'})

}
