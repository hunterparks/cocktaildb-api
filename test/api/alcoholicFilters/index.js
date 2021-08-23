let server = require('../../../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Alcoholic filters route', () => {
    it('Should return all possible alcoholic filters', (done) => {
        chai.request(server)
            .get('/api/json/v1/alcoholic_filters')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(3);
                done();
            });
    });
});