module.exports = function pizzaFactory() {
    var Cart = {large: 0, medium: 0, small: 0}

    function addToCart(typeIn) {
        Cart[typeIn] += 1 ;
    }

    function getCart() {
        return Cart;
    }

    return {
        addToCart,
        getCart
    }
}