const express =require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("config");
const { check, validationResult } = require("express-validator/check");


const User = require("../../models/User")


router.get('/',(req, res) => {
    var allusers = User.find({}, function (err, users){
        res.json(users)
    })
});

//@route    GET api/users
//@desc     Register user
//@access   Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', "Please include a valid email")
        .isEmail(),
    check('password', "Please enter a password with 6 or more characters")
        .isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password } = req.body;
   
    //See if the user exists
    try{
        let user = await User.findOne({ email })

        if(user){
            return res
            .status(400)
            .json({errors: [{msg: 'User already exists'}]});
        }

    //Get users gravatar
    const avatar = gravatar.url(email, {
        //default size
        s: '200',
        //rating
        r: 'pg',
        //default user image icon
        d: 'mm'
    })
    user = new User({
        name,
        email,
        avatar,
        password
    })

    //Encrypt the password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //return jsonwebtoken
    const payload ={
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token)=> {
            if(err) throw err;
            res.json({ token });
        });
    // res.send('User registered')

    } catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }

});


module.exports = router;