let assert = require('assert');
let factory = require('../pizzaFactory');

describe('Tests: ', () => {

    describe('Calculate cost of Small pizzas: ', () => {

        it('3 Small pizzas should equal 95.97', () => {
            assert.equal(factory().calcSmall(3), 95.97);
        })

        it('2 small pizzas should equal 63.98', () => {
            assert.equal(factory().calcSmall(2), 63.98);
        })
    })

    describe('Calculate cost of Medium pizzas: ', () => {
        it('3 Medium pizzas should equal 176.97', () => {
            assert.equal(factory().calcMed(3), 176.97);
        })

        it('2 Medium pizzas should equal 117.98', () => {
            assert.equal(factory().calcMed(2), 117.98);
        })
    })

    describe('Calculate cost of Large pizzas: ', () => {
        it('3 Large pizzas should equal 263.97', () => {
            assert.equal(factory().calcLarge(3), 263.96999999999997);
        })

        it('2 Large pizzas should equal 117.98', () => {
            assert.equal(factory().calcLarge(2), 175.98);
        })
    })

    describe('Calculate total cost of all pizzas: ', () => {
        it('3 Large, 2 Medium and 0 Small pizzas should come to 381.95', () => {
            assert.equal(factory().calcTotal(0, 2, 3), 381.95);
        })
        it('1 Large, 2 Medium and 3 Small pizzas should come to 301.94', () => {
            assert.equal(factory().calcTotal(3, 2, 1), 301.94);
        })
    })
})