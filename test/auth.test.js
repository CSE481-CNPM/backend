const chai = require('chai');
const mocha = require('mocha');
const sinon = require('sinon');
const request = require('supertest');

const app = require('../app');
const User = require('../models/User.model');

const expect = chai.expect;

mocha.describe('Authentication', () => {
  mocha.it('Người dùng đăng nhập thành công', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'son@gmail.com', password: '123456' });

    expect(res.statusCode).to.equal(200);
    expect(res.body.success).to.equal(true);
  });

  mocha.it('Đăng nhập tài khoản bị sai email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'son1@gmail.com', password: '123456' });

    expect(res.statusCode).to.equal(401);
    expect(res.body.success).to.equal(false);
    expect(res.body.error).to.equal('Tài khoản không tồn tại');
  });
});
