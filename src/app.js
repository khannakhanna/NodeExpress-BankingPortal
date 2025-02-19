const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();
const {accounts, users, writeJSON} = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended : true }));

/* This code has been moved to data.js
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf-8'
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf-8'
);
const users = JSON.parse(userData); 
*/

app.get('/', (req, res) => res.render('index', {title : 'Account Summary', accounts}));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get(
    '/profile', (req, res) => {
        res.render('profile', {user : users[0]});
    }
);

app.listen(3000, () => console.log('PS project running on port 3000'));