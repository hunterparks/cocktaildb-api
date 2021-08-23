let server = require('../../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Bare API route', () => {
    it('Should return a docs message', (done) => {
        chai.request(server)
            .get('/api/json/v1')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('👋 add a /docs to your request for more information');
                done();
            });
    });
});