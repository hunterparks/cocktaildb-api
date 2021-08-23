let utility = require('../../src/utility');
let chai = require('chai');

chai.should();

describe('Utility class', () => {
    it('Should merge arrays without duplicates', (done) => {
        // Arrange
        const testArrayA = [ 'A', 'B' ];
        const testArrayB = [ 'B', 'C' ];
        const expectedArray = [ 'A', 'B' ];
        // Act
        const actualArray = utility.mergeWithoutDupes(testArrayA, testArrayB);
        // Assert
        actualArray.should.deep.eq(expectedArray);
        done();
    });
});