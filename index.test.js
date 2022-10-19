const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const SALT_COUNT = parseInt(process.env.SALT_COUNT);

const app = require('./index');
const { sequelize, Kitten, User } = require('./db');
const seed = require('./db/seedFn');
const { kittens, users } = require('./db/seedData');

// const createTestUser = async (userData) => {
//     const hashed = await bcrypt.hash(userData.password, SALT_COUNT);
//     user = await User.create({ username: userData.username, password: hashed });
//     const {id, username: createdUsername} = user;
//     token = jwt.sign({id, username: createdUsername}, JWT_SECRET);
//     return {user, token};
// }

describe('Endpoints', () => {
  const testKittenData = { name: 'Katy Purry', age: 3, color: 'golden' };
  const testUserRegisterData = { username: 'buster', password: 'bustthis' };

  beforeAll(async () => {
    await seed();
  });

  describe('GET /', () => {
    it('should return correct html', async () => {
      const registerResponse = await request(app).get('/');
      expect(registerResponse.status).toBe(200);
      expect(registerResponse.text).toBe(`
      <h1>Welcome to Cyber Kittens!</h1>
      <p>Cats are available at <a href="/kittens/1">/kittens/:id</a></p>
      <p>Create a new cat at <b><code>POST /kittens</code></b> and delete one at <b><code>DELETE /kittens/:id</code></b></p>
      <p>Log in via POST /login or register via POST /register</p>
    `);
    });
  });

  describe.skip('login and register', () => {
    describe('POST /register', () => {
      it('should send back success with token', async () => {
        expect(registerResponse.status).toBe(200);
        expect(registerResponse.body).toEqual({
          message: 'success',
          token: expect.stringMatching(/^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/),
        });
      });
      it('should create user with username', async () => {
        const foundUser = await User.findOne({ where: { username: 'buster' } });
        expect(foundUser).toBeTruthy();
        expect(foundUser.username).toBe('buster');
      });
      it('should hash password', async () => {
        const foundUser = await User.findOne({ where: { username: 'buster' } });
        expect(foundUser).toBeTruthy();
        expect(foundUser.password).not.toBe(testUserData.password);
        expect(foundUser.password).toEqual(expect.stringMatching(/^\$2[ayb]\$.{56}$/));
      });
    });

    describe('POST /login', () => {
      it('should send back success with token', async () => {
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toEqual({
          message: 'success',
          token: expect.stringMatching(/^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/),
        });
      });
      it('if password incorrect, should send back 401 unauthorized, with message', async () => {
        const incorrectLoginResponse = await request(app)
          .post('/login')
          .send({
            username: 'buster',
            password: 'notright',
          })
          .catch((err) => console.error(err));
        expect(incorrectLoginResponse.status).toBe(401);
        expect(incorrectLoginResponse.text).toBe('Unauthorized');
      });
    });
  });

  describe('/kittens endpoints', () => {
    describe('GET /kittens/:id', () => {
      //create token for user
      const { username1 } = users[0];
      const { username2 } = users[1];
      const authorizedToken = jwt.sign({ username1, id: 1 }, JWT_SECRET);
      const unauthorizedToken = jwt.sign({ username2, id: 2 }, JWT_SECRET);
      // expected cat object
      const getExpectedCat = ({ age, color, name }) => ({ age, color, name });

      it('should return a single cat', async () => {
        const response = await request(app).get(`/kittens/${1}`).set('Authorization', `Bearer ${authorizedToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(getExpectedCat(kittens[0]));
      });
      it('should return 401 if no token', async () => {
        const response = await request(app).get(`/kittens/${1}`);
        expect(response.status).toBe(401);
        expect(response.text).toBe('Currently not logged in.');
      });
      it('should return 401 if kitten not owned by user', async () => {
        const response = await request(app).get(`/kittens/${1}`).set('Authorization', `Bearer ${unauthorizedToken}`);
        expect(response.status).toBe(401);
        expect(response.text).toBe('Unauthorized user.');
      });
    });
    describe.skip('POST /kittens', () => {
      it('should create a new cat', async () => {
        const newKittenData = { name: 'Bobby', age: 3, color: 'golden' };
        const response = await request(app)
          .post('/kittens')
          .set('Authorization', `Bearer ${token}`)
          .send(newKittenData);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newKittenData);
      });
      it('should return 401 if no token', async () => {
        const newKittenData = { name: 'Bobby', age: 3, color: 'golden' };
        const response = await request(app).post('/kittens').send(newKittenData);
        expect(response.status).toBe(401);
        expect(response.text).toBe('Unauthorized');
      });
    });
    describe.skip('DELETE /kittens/:id', () => {
      it('should delete a cat', async () => {
        const response = await request(app).delete(`/kittens/${kitten.id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
        const deleted = await Kitten.findByPk(kitten.id);
        expect(deleted).toBeFalsy();
      });
      it('should return 401 if no token', async () => {
        const response = await request(app).delete(`/kittens/${kitten.id}`);
        expect(response.status).toBe(401);
        expect(response.text).toBe('Unauthorized');
      });
      it('should return 401 if kitten not owned by user', async () => {
        const { token, user } = await createTestUser({ username: 'notbuster', password: 'notbustthis' });
        const response = await request(app).delete(`/kittens/${kitten.id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
        expect(response.text).toBe('Unauthorized');
      });
    });
  });
});
