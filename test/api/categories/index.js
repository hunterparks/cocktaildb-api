let server = require('../../../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Categories route', () => {
    it('Should return all possible categories', (done) => {
        chai.request(server)
            .get('/api/json/v1/categories')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(11);
                done();
            });
    });
});