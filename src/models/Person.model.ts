import {Table, Column, Model} from 'sequelize-typescript';
import { constants } from '../../util';
 
@Table
export class Person extends Model<Person> {
 
  @Column public name!: string;
  @Column public email!: string;
  @Column public psswd!: string;


  static validate(obj: any) {
    return [
      [obj, 'Cannot validate empty object as Person'],
      [obj.name, 'Name field is mandatory.'],
      [obj.email, 'Email field is mandatory.'],
      [obj.email && obj.email.match(constants.emailRegex), 'Invalid email provided.'],
      [obj.psswd, 'Password field is mandatory.'],
      [obj.psswd && obj.psswd.length > 5, 'Password must be at least 6 characters long.']
    ]
  }
}