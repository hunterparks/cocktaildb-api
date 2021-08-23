let server = require('../../../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Ingredients route', () => {
    it('Should return all possible ingredients', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(100);
                done();
            });
    });

    it('Should return a specific ingredient by name', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients?q=vodka')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('ingredients');
                response.body.should.have.property('ingredients').to.be.a('array');
                response.body.should.have.property('ingredients').length(1);
                response.body.should.have.nested.property('ingredients[0].strIngredient');
                response.body.should.have.nested.property('ingredients[0].strIngredient').eq('Vodka');
                done();
            });
    });

    it('Should error with a bad ingredient name', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients?q=')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Please provide a name to search with');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should return a specific ingredient by id', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients/552')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('ingredients');
                response.body.should.have.property('ingredients').to.be.a('array');
                response.body.should.have.property('ingredients').length(1);
                response.body.should.have.nested.property('ingredients[0].idIngredient');
                response.body.should.have.nested.property('ingredients[0].idIngredient').eq('552');
                done();
            });
    });

    it('Should error with a bad ingredient id', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients/fail')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Invalid ingredient id: \'fail\'');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should return a specific thumbnail by id', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients/2/preview')
            .end((err, response) => {
                response.should.have.status(200);
                response.header['content-type'].split('/')[0].should.eq('image');
                response.header['content-length'].should.eq('221184');
                done();
            });
    });

    it('Should return a specific medium thumbnail by id', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients/2/preview/medium')
            .end((err, response) => {
                response.should.have.status(200);
                response.header['content-type'].split('/')[0].should.eq('image');
                response.header['content-length'].should.eq('60666');
                done();
            });
    });

    it('Should return a specific small thumbnail by id', (done) => {
        chai.request(server)
            .get('/api/json/v1/ingredients/2/preview/small')
            .end((err, response) => {
                response.should.have.status(200);
                response.header['content-type'].split('/')[0].should.eq('image');
                response.header['content-length'].should.eq('6632');
                done();
            });
    });
});