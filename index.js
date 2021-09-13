const express = require('express');
const exphbs = require('express-handlebars');
const factory = require('./pizzaFactory');


const app = express();
const PORT = process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

let pizzaCart = { large: 0, medium: 0, small: 0 };
let orderList = [];

app.get('/', function (req, res) {
	res.redirect('/Order')
});

app.get('/Order', function (req, res) {
	res.render('index', { smallCount: pizzaCart['small'], smallPrice: 'R' + pizzaCart['small'] * 31.99, medCount: pizzaCart['medium'], medPrice: 'R' + pizzaCart['medium'] * 58.99, largeCount: pizzaCart['large'], largePrice: 'R' + pizzaCart['large'] * 87.99 })
})

app.get('/order/:size', function (req, res) {
	// factory().addToCart(req.params.size);
	pizzaCart[req.params.size] += 1;

	res.redirect('/Order');
})

app.get('/place', function (req, res) {
	let total = (pizzaCart["small"] * 31.99) + (pizzaCart["medium"] * 58.99) + (pizzaCart["large"] * 87.99);
	if (total > 0) {
		orderList.push({ orderID: orderList.length + 1, status: "Payment Due", amount: total });
		pizzaCart = { large: 0, medium: 0, small: 0 };
	}
	res.redirect('/Order');
})

app.get('/clear', function(req, res) {
	orderList = [];

	res.redirect('OrdersList')
})

app.get('/OrdersList', function (req, res) {
	res.render('orders', {orders: orderList})
})

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});