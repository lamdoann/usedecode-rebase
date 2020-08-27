import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';

function handleHelloWorld(_: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  res.json({ msg: 'Hello, world' });
}

function handleReverse(req: Request, res: Response) {
  res.json({
    msg: req.params.msg
      .split('')
      .reverse()
      .join(''),
  });
}
function handleUppercase(req: Request, res: Response) {
  const message = req.query.msg || 'no message given';
  res.json({ msg: (message as string).toUpperCase() });
}

function handleLowercase(req: Request, res: Response) {
  const message = req.query.msg || 'no message given';
  res.json({ msg: (message as string).toLowerCase() });
}

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', handleHelloWorld);
app.get('/reverse/:msg', handleReverse);
app.get('/uppercase', handleUppercase);
app.get('/lowercase', handleLowercase);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message as string;

  res.status(status).send({ status, message });
});

const server = app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d', app.get('port'));
});

export { server, app };
