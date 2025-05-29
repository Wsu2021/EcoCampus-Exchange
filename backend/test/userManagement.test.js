const request = require('supertest');
const expect = require('chai').expect;


const app = require('../app');

describe('Authentication Routes', () => {
//Login Tests

  describe('POST /users/login', () => {
    it('should login with valid credentials and redirect to profile', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: 'p3',
          password: '12345'
        })
        .expect(302)
        .expect('Location', '/users/profile')
        .end(done);
    });

    it('should show error with wrong password', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: 'p3',
          password: 'wrong123'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.text.toLowerCase()).to.include('invalid username or password');
          done(err);
        });
    });

    it('should show error with non-existent username', (done) => {
      request(app)
        .post('/users/login')
        .send({
          username: 'ghost123',
          password: 'somepass'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.text.toLowerCase()).to.include('invalid username or password');
          done(err);
        });
    });
  });


  // Register Tests

  describe('POST /users/register', () => {
    const uniqueUser = 'testuser_' + Date.now();

    it('should register a new user and redirect to login', (done) => {
      request(app)
        .post('/users/register')
        .send({
          username: uniqueUser,
          password: 'testpass',
          fullName: 'Test User',
          email: `${uniqueUser}@email.com`,
          address: '123 Test Street',
          phoneNumber: '1234567890'
        })
        .expect(302)
        .expect('Location', '/users/login')
        .end(done);
    });

    it('should show error when registering with an existing username', (done) => {
      request(app)
        .post('/users/register')
        .send({
          username: uniqueUser, 
          password: 'anotherpass',
          fullName: 'Clash User',
          email: 'conflict@email.com',
          address: 'Conflict Street',
          phoneNumber: '9999999999'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.text.toLowerCase()).to.include('error'); 
          done(err);
        });
    });
  });


  //Profile Tets
  describe('GET /users/profile', () => {
    const agent = request.agent(app); 

    it('should allow access to profile after login', (done) => {
      agent
        .post('/users/login')
        .send({
          username: 'p3',
          password: '12345'
        })
        .expect(302)
        .expect('Location', '/users/profile')
        .end((err) => {
          if (err) return done(err);

          agent
            .get('/users/profile')
            .expect(200)
            .end((err, res) => {
              expect(res.text).to.include('Full Name');
              done(err);
            });
        });
    });

    it('should redirect to login if accessing profile without being logged in', (done) => {
      request(app)
        .get('/users/profile')
        .expect(302)
        .expect('Location', '/users/login')
        .end(done);
    });
  });
});
