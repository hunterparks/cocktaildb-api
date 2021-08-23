let server = require('../../../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Glasses route', () => {
    it('Should return all possible glasses', (done) => {
        chai.request(server)
            .get('/api/json/v1/glasses')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(32);
                done();
            });
    });
});