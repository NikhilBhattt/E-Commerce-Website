const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generate-token');

module.exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if ( await userModel.findOne({email : email}) ) {
            req.flash('error', 'Account already exists with provided email');
            return res.redirect('/');
        }

        bcrypt.genSalt( (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);

                const user = await userModel.create({
                    fullname, email, password : hash
                });

                const token = generateToken(user);
                res.cookie('token', token);
                res.redirect('/shop');
            })
        })
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email : email });
    if (!user) {
        req.flash('error', 'Email or Password is incorrect');
        return res.redirect('/');
    };

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) res.status(500).send(err.message);

        if (result) {
            const token = generateToken(user);
            res.cookie('token', token);
            req.flash('success', 'Logged In successfully!');
            return res.redirect('/shop');
        } else {
            req.flash('error', 'Email or Password is incorrect');
            res.redirect('/');
        }
    })
}

module.exports.logoutUser = (req, res) => {
    res.cookie('token', '');
    req.flash('success', 'Logged out Successfully!')
    res.redirect('/');
}