let server = require('../../../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Custom cocktails route', () => {
    it('Should return the created cocktail', (done) => {
        chai.request(server)
            .post('/api/json/v1/custom_cocktails')
            .set('content-type', 'application/json')
            .send({
                name: 'Test cocktail',
                ingredients: [
                    'test'
                ]
            })
            .end((err, response) => {
                response.should.have.status(201);
                response.body[0].should.have.property('name');
                response.body[0].should.have.property('name').eq('Test cocktail');
                done();
            });
    });

    it('Should return all custom cocktails', (done) => {
        chai.request(server)
            .get('/api/json/v1/custom_cocktails')
            .end((err, response) => {
                response.should.have.status(200);
                response.body[0].should.have.property('id').eq(1);
                done();
            });
    });

    it('Should return specified custom cocktail', (done) => {
        chai.request(server)
            .get('/api/json/v1/custom_cocktails/1')
            .end((err, response) => {
                response.should.have.status(200);
                response.body[0].should.have.property('id').eq(1);
                done();
            });
    });

    it('Should error with a bad specified cocktail id', (done) => {
        chai.request(server)
            .get('/api/json/v1/custom_cocktails/fail')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Invalid custom cocktail id: \'fail\'');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should return the updated cocktail', (done) => {
        chai.request(server)
            .put('/api/json/v1/custom_cocktails/3')
            .set('content-type', 'application/json')
            .send({
                name: 'Rum & Coke'
            })
            .end((err, response) => {
                response.should.have.status(200);
                response.body[0].should.have.property('name');
                response.body[0].should.have.property('name').eq('Rum & Coke');
                done();
            });
    });

    it('Should error with a bad updated cocktail id', (done) => {
        chai.request(server)
            .put('/api/json/v1/custom_cocktails/fail')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Invalid custom cocktail id: \'fail\'');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should error with a bad deleted cocktail id', (done) => {
        chai.request(server)
            .delete('/api/json/v1/custom_cocktails/fail')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Invalid custom cocktail id: \'fail\'');
                response.body.should.have.property('stack');
                done();
            });
    });
});