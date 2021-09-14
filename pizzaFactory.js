module.exports = function pizzaFactory() {

    function calcSmall(input) {
        return input * 31.99
    }

    function calcMed(input) {
        return input * 58.99
    }

    function calcLarge(input) {
        return input * 87.99
    }

    function calcTotal(small, medium, large) {
        return (small * 31.99) + (medium * 58.99) + (large * 87.99)
    }

    function formatObject(small, medium, large) {
        return { smallCount: small, smallPrice: calcSmall(small), medCount: medium, medPrice: calcMed(medium), largeCount: large, largePrice: calcLarge(large), totalCost: calcTotal(small, medium, large)}
    }

    return {
        calcSmall,
        calcMed,
        calcLarge,
        calcTotal,
        formatObject
    }
}