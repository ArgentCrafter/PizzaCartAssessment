const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const factory = require('./pizzaFactory');

const pizzaFactory = factory();

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

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))


app.get('/', function (req, res) {
	res.redirect('/Order')
});

app.get('/Order', function (req, res) {
	if (!req.session.pizzaCart || !req.session.orderList) {
		req.session.pizzaCart = { large: 0, medium: 0, small: 0 };
		req.session.orderList = [];
	}

	res.render('index', pizzaFactory.formatObject(req.session.pizzaCart['small'], req.session.pizzaCart['medium'], req.session.pizzaCart['large']))
})

app.get('/order/:size', function (req, res) {
	req.session.pizzaCart[req.params.size] += 1;

	res.redirect('/Order');
})

app.get('/redact/:size', function (req, res) {
	if (req.session.pizzaCart[req.params.size] > 0) {
		req.session.pizzaCart[req.params.size] -= 1;
	}

	res.redirect('/Order');
})

app.get('/place', function (req, res) {
	let total = pizzaFactory.calcTotal(req.session.pizzaCart['small'], req.session.pizzaCart['medium'], req.session.pizzaCart['large']);
	if (total > 0) {
		req.session.orderList.push({ orderID: req.session.orderList.length + 1, status: "Payment Due", amount: total, action: "Pay" });
		req.session.pizzaCart = { large: 0, medium: 0, small: 0 };
	}
	res.redirect('/Order');
})

app.get('/clear', function (req, res) {
	req.session.orderList = [];

	res.redirect('OrdersList')
})

app.get('/OrdersList', function (req, res) {
	res.render('orders', { orders: req.session.orderList })
})

app.get('/Payment%20Due/:orderID', function (req, res) {
	let currOrder = req.session.orderList[req.params.orderID - 1];
	currOrder['status'] = "Paid";
	currOrder['action'] = 'Collect';

	res.redirect('/OrdersList');
})

app.get('/Paid/:orderID', function (req, res) {
	let currOrder = req.session.orderList[req.params.orderID - 1];
	currOrder['status'] = "Collected";
	delete currOrder['action'];

	res.redirect('/OrdersList');
})

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});