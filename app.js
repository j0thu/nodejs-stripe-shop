//EXPRESS
const express = require('express');
const app = express();

const keys = require('./config/keys');

//STRIPE
const stripe = require('stripe')(keys.stripeSecretKey);

//BODY-PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//EXPRESS HANDLEBARS and MIDDLEWARE
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Set Static Folder
app.use(express.static(`${__dirname}/public`));

//INDEX ROUTE
app.get('/', (req, res)=>{
    res.render('index', {stripePublishableKey: keys.stripePublishableKey});
})

//CHARGE ROUTE
app.post('/charge', (req, res)=>{
    const amount = 25000;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Jonny Ben',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        }
    })
    .then(customer => stripe.charges.create({
        amount:amount, //In es6 you can jus leave it as amount,
        description: 'Ryzen Processor',
        currency: 'usd',
        customer: customer.id,
    }))
    .then(charge => res.render('success'));
})

//SERVER
const PORT = process.env.PORT || 5550;
app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})