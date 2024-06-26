const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const userRouters = require('./routes/userRouter');
const ownerRouters = require('./routes/ownerRouter');
const productRouters = require('./routes/productRouter');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+'public')));
app.set('view engine', 'ejs');

app.use('/', userRouters);
app.use('/admin', ownerRouters);
app.use('/product', productRouters);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});