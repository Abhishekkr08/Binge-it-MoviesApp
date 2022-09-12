const express = require('express');
const dotenv = require('dotenv');
const app = express();
const Users = require('./src/model/schema');
const User_Reviews = require('./src/model/review_schema');
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { resourceLimits } = require('worker_threads');
const cookieParser = require('cookie-parser');
const auth = require('./src/middleware/auth');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
dotenv.config({path:'./.env'})
require('./src/db/conn');


const port = process.env.PORT || 8080;
const public_path = path.join(__dirname, './public');
app.use(express.static(public_path)); // for connecting the public folder inside it
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, './views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




// ########################################### ROUTES ##############################################

app.get('/', (req, res) => {
    res.render('signin');
});


app.get('/signin', (req, res) => {
    res.render('signin');
});


app.get('/signup', (req, res) => {
    res.render('signup');
});



// mail sending process (details of sender)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL_ID,
        pass: process.env.ADMIN_EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})


app.post('/signup', async (req, res) => {

    let { firstname, lastname, email, username, password, confirmpassword } = req.body;

    if (!email || !username) {
        res.render('signup', { msg: "Please fill all the details to register" });
        console.log("User didnt filled imp fields")
    }

    else {
        if (password === confirmpassword) {
            const email_alreadyPresent = await Users.findOne({ email: email }) // this will return a null if fails to find anything
            const username_alreadyPresent = await Users.findOne({ username: username })  // this will also return a null if fails to find anything

            if (email_alreadyPresent != null && email === email_alreadyPresent.email) {
                res.render('signup', { msg: "This Email id is already present" });
            }

            else if (username_alreadyPresent != null && username === username_alreadyPresent.username) {
                res.render('signup', { msg: "Username already exists" });
            }

            else {
                let newUser = new Users({
                    firstname,
                    lastname,
                    email,
                    username,
                    password,
                    emailToken: crypto.randomBytes(64).toString('hex'),
                    isVerified: false
                })

                let result = newUser.save()
                    .then((output) => {
                        console.log('Details of the Registered User --> ' + output);
                       
                        // setting up mail content for sending verification email to user 
                        var mailOptions = {
                            from:   ` "Binge-It" <${process.env.ADMIN_EMAIL_ID}>`,
                            to: newUser.email,
                            cc: `${process.env.ADMIN_EMAIL_ID}`,
                            subject: 'Verify Your Binge⁐it Email Address',
                            html: `<body style="font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
                            <table width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f6f7">
                                <tbody>
                                    <tr>
                                        <td height="50"></td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top">
                        
                                            <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
                                                style="border:1px solid #f1f2f5">
                                                <tbody>
                                                    <tr>
                                                        <td colspan="3" height="60" bgcolor="#ffffff"
                                                            style="border-bottom:1px solid #eeeeee;padding-left:16px" align="left">
                        
                                                            <p
                                                                style="font-size:25px;line-height:28px;color:rgb(61, 61, 61);font-weight:700;letter-spacing:0">
                                                                Binge⁐it</p>
                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" height="20"></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="20"></td>
                                                        <td align="left">
                        
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colspan="3" height="20"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="3">
                                                                            <h4
                                                                                style="text-align:center;font-size:23px;line-height:28px;color:#3d4f58;font-weight:500;letter-spacing:0">
                                                                                Hi ${newUser.username} 😄 <br> Thanks For Registration.
                                                                            </h4>
                                                                            <div style="display:flex;margin:36px 0px"><img
                                                                                    src="https://ci4.googleusercontent.com/proxy/09GNyAe8nBJ_YQQHvF_khhFc79wh1SECa9z1yaHgRbSGR7gpXR-U7HJLYPh6fzAfhBiQnuvxEHTWKh18Ptp1NWAeo4WjirJmOiGv9cjf6EVR8kEOghbnV4JlXhXWOAQ=s0-d-e1-ft#https://cloud.mongodb.com/static/images/emailVerification/email-verified.png"
                                                                                    width="540" height="270" class="CToWUd a6T" data-bit="iit"
                                                                                    tabindex="0">
                                                                
                                                                            </div>
                                                                            <table width="100%" style="width:100%!important">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center">
                        
                        
                                                                                            <a href="https://${req.headers.host}/verify-email?token=${newUser.emailToken}"
                                                                                                style="display:inline-block;text-decoration:none;width:159px">
                                                                                                <div
                                                                                                    style="font-family:Helvetica,Arial,sans-serif;width:159px;text-align:center;padding:12px 0;background-color:#13aa52;border:1px solid #158242;border-radius:3px;display:block;color:#ffffff;font-size:18px;font-weight:normal;text-decoration:none;letter-spacing:normal">
                                                                                                    Verify Email</div>
                                                                                            </a>
                        
                        
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <p
                                                                                style="font-size:15px;line-height:25px;color:#21313c;letter-spacing:0;margin:36px 32px 33px">
                                                                                Please verify and confirm your email address by clicking on the above button.
                                                                                <br>
                                                                                <br>
                                                                                <b> You will be automatically redirected to the website after verification.
                                                                                </b>
                                                                            </p>
                        
                        
                        
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="3" height="10"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="3" style="text-align:center">
                                                                            <span
                                                                                style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#cccccc">This
                                                                                message was sent from Binge⁐it , © 2022.  </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td width="20"></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" height="20"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="50">
                        
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </body>`
                        }




                        //sending mail
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error)
                            }
                            else {
                                console.log('verification mail is sent to your gmail id');
                            }
                        })

                        res.status(200).render('verifying-user', {msg:newUser.email})
                    }).catch((err) => {
                        console.log('ERROR CAUGHT WHILE SAVING USER IS --->' + err);
                        res.status(400).render('signup', { msg: "Invalid Email id, please enter a valid email id" });
                    })
            }

        }

        else {
            res.render('signup', { msg: "please enter the same password again" });
        }

    }

});


app.get('/verify-email', async (req, res) => {
    try {
        const email_verif_token = req.query.token
        const email_verified_user = await Users.findOne({ emailToken: email_verif_token })
        if (email_verified_user) {
            email_verified_user.emailToken = null
            email_verified_user.isVerified = true
            await email_verified_user.save()



            // generation of token after successfully verifying the email address
            const token = await email_verified_user.generateAuthToken();
            console.log('Token generated while register -->' + token);
 
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true
            })

            res.render('user-verified', { msg: email_verified_user.username });
        }
        else {
            res.render('signup', { msg: 'your email is not verified, Please try after again' });
            console.log('email is not verified')
        }
    }
    catch (err) {
        console.log(err);
        res.render('signin')
    }
});


app.get('/user-verified', async (req, res) => {
    res.render('user-verified', { msg: req.UserData.username });
});


app.get('/verifying-user', async (req, res) => {
    res.render('verifying-user', { msg: req.UserData.username });
});


app.post('/signin', async (req, res) => {
    try {

        let { email, password } = req.body
        if (!email || !password) {
            res.render('signin', { msg: 'please fill all the details to signin' });
        }
        else {
            // console.log(`guest entered the email --> ${email} and pass is ${password}`)
            const isUser_exist = await Users.findOne({ email: email })
            // console.log("details of the user with given emial is -->" + isUser_exist);

            if (isUser_exist.isVerified) {
                const token = await isUser_exist.generateAuthToken();
                console.log('Token generated while sign in -->' + token);

                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 600000),
                    httpOnly: true
                })
            }
            else {
                res.render('signin', { msg: 'Please check your mailbox and kindly verify your email id first !' })
                console.log('users email id verification attribute is either false or not present in the database');
            }

            // console.log(`cookie while login is ${req.cookies.jwt}`);

            //final checking of login details
            if (email != null && email === isUser_exist.email && password === isUser_exist.password) {
                console.log("Successfully signed in this is our genuine user");
                res.render('index', { name: isUser_exist.username });
            }
            else {
                res.render('signin', { msg: "Wrong Password" });
                console.log('wrong password forgot pw');
            }
        }
    }
    catch {
        res.render('signin', { msg: "Invalid login credentials, Please Sign up first" })
        console.log("No user found with this email id");
    }
});


app.get('/logout', auth, async (req, res) => {
    try {
        req.UserData.tokens = [];
        res.clearCookie('jwt');
        console.log('logout successfully');
        await req.UserData.save();
        res.render('signin', { logout_msg: "Logged Out Successfully" });

    }
    catch (err) {
        console.log(err);
        res.render('signin', { logout_msg: "Some error occured while loggin out , Please refresh" });
    }
});


app.get('/index', auth, async (req, res) => {

    console.log("this is username of the logged user----->" + req.UserData.username);
    res.render('index', { name: req.UserData.username });

});


let temo = new Date();
console.log(temo.toISOString().slice(0, 10));
app.post('/index', auth, async (req, res) => {
    try {
        let date = new Date()
        console.log(req.UserData.username + "~~~~~~~~~~~~~~~~~~~>" + req.body.review);
        let newReview = new User_Reviews({
            username: req.UserData.firstname + " " + req.UserData.lastname,
            date: date.toISOString().slice(0, 10),
            review: req.body.review
        })
        let result = await newReview.save();
        console.log(result);
        res.render('index', { name: req.UserData.username });
    }
    catch (err) {
        res.render('index', { name: req.UserData.username });
        console.log('some error occured while saving the review in the database' + err);
    }
});


app.get('/movie', auth, (req, res) => {
    res.render('movie');
});

app.get('/search', auth, (req, res) => {
    res.render('search');
});

app.get('/details', auth, (req, res) => {
    res.render('details');
});

app.get('/about', auth, (req, res) => {

    res.render('about');
});

app.get('/signup', (req, res) => {

    res.render('signup');
});


app.get('/api/reviews', async (req, res) => {
    try {
        let listOfUsers = await User_Reviews.find()
        res.status(200).send(listOfUsers);
    }
    catch {
        res.status(400).send("error while finding user list");
    }
});


app.get('*', (req, res) => {
    res.send('Error 404 page not found');
});


app.listen(port, () => {
    console.warn(`Server listening on port number ${port}`);
})
