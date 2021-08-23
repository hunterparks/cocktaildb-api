let server = require('../../../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Cocktails route', () => {
    it('Should return a list of cocktails by first letter', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?firstLetter=a')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(10);
                done();
            });
    });
    
    it('Should error with a bad first letter', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?firstLetter=1')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Filter letter must be a single A-Z or a-z only');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should return a list of cocktails by type', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?type=Alcoholic')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(10);
                done();
            });
    });

    it('Should return a list of cocktails by category', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?category=Ordinary_Drink')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(10);
                done();
            });
    });

    it('Should return a list of cocktails by glass', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?glass=Cocktail_glass')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(10);
                done();
            });
    });

    it('Should return a list of cocktails by ingredients', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?ingredients=Gin')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(10);
                done();
            });
    });

    it('Should return a list of cocktails by multiple ingredients', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?ingredients=Dry_Vermouth,Gin,Anis')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(1);
                done();
            });
    });

    it('Should return a specific cocktail by name', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?q=margarita')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(6);
                response.body.should.have.nested.property('drinks[0].strDrink');
                response.body.should.have.nested.property('drinks[0].strDrink').eq('Margarita');
                done();
            });
    });

    it('Should error with a bad cocktail name', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails?q=')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Please provide a name to search with');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should return a random cocktail', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails/random')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(1);
                done();
            });
    });

    it('Should return a specified number of random cocktails', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails/random/3')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(3);
                done();
            });
    });

    it('Should error with a bad number of random cocktails', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails/random/fail')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Invalid random count: \'fail\'');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should return a specific cocktail by id', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails/11007')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('drinks');
                response.body.should.have.property('drinks').to.be.a('array');
                response.body.should.have.property('drinks').length(1);
                response.body.should.have.nested.property('drinks[0].idDrink');
                response.body.should.have.nested.property('drinks[0].idDrink').eq('11007');
                done();
            });
    });

    it('Should error with a bad cocktail id', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails/fail')
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                response.body.should.have.property('message').eq('Invalid cocktail id: \'fail\'');
                response.body.should.have.property('stack');
                done();
            });
    });

    it('Should return a specific thumbnail by id', (done) => {
        chai.request(server)
            .get('/api/json/v1/cocktails/11007/preview')
            .end((err, response) => {
                response.should.have.status(200);
                response.header['content-type'].split('/')[0].should.eq('image');
                response.header['content-length'].should.eq('11340');
                done();
            });
    });
});