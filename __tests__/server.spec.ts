import { server, app } from '../src/server';
import * as request from 'supertest';

describe('server', () => {
  it('responds hello', done => {
    request(app)
      .get('/')
      .expect(200, { msg: 'Hello, world' }, done)
  });

  it('reverses', done => {
    request(app)
      .get('/reverse/hello')
      .expect(200, { msg: 'olleh' }, done);
  });

  it('responds uppercase', done => {
    request(app)
      .get('/uppercase?msg=hello')
      .expect(200, { msg: 'HELLO' }, done);
  });

  it('responds lowercase', done => {
    request(app)
      .get('/lowercase?msg=LamDoan')
      .expect(200, { msg: 'lamdoan' }, done);
  });

  afterAll(async () => {
    server.close();
  });
});
