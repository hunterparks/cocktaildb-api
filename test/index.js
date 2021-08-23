let server = require('../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Bare server route', () => {
    it('Should return a welcome message', (done) => {
        chai.request(server)
            .get('/')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('🍺 Welcome to The Cocktail DB wrapper API 🥂');
                done();
            });
    });
});