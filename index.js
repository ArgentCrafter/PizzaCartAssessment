const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const PORT =  process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
	res.redirect('/Order')
});

app.get('/Order', function(req, res) {
	res.render('index')
})

app.get('/OrdersList', function(req, res) {
	res.render('orders')
})

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});