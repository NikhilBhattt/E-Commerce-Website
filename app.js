const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouters = require('./routes/index');
const userRouters = require('./routes/userRouter');
const ownerRouters = require('./routes/ownerRouter');
const productRouters = require('./routes/productRouter');

const db = require('./config/mongoose-connection');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_KEY
}));
app.use(express.static(path.join(__dirname+'public')));
app.set('view engine', 'ejs');
app.use(flash());

app.use('/', indexRouters);
app.use('/users', userRouters);
app.use('/admin', ownerRouters);
app.use('/products', productRouters);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});