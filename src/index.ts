import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { testRouter } from './routers/Person.router';
import bodyParser from 'body-parser';

import * as db from './db';

db.initDb()


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/person', testRouter);

app.all('*', (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) next(err);
  res.status(404).end('Not found');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  
  let isObject;

  try {
    isObject = JSON.parse(err.message);
  } catch (error) {
    isObject = false;
  }
  
  res.status(500).json({
    error: isObject || err.message
  });
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));