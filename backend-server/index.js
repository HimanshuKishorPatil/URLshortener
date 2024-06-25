
import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import bcrypt from "bcrypt"
import red from "node-red"
import {
  addNewUser,
  verifyIsUsernameAlreadyExist,
  getOtp,
  otpVerified,
  isOtpVerified,
  registerNewUser,
  resetPassword,
  getExistUserPassword,
  updateLoginLog,
  getUUIDOfLoggedInUser,
  isSignedUserExist,
  isNewUrlAlreadyExist,
  isAlreadyShortUrlExist,
  insertShortUrl,
  modifyUrlData,
  deleteUrlData,
  deleteToken,
  getUserUrlHistory,
  addNewSignInUser,
  getUUIDOfSignInUser,
  getShortUrlOf,
  googleSignInUserExist, updateGoogleSignInLog, addNewGoogleSignInUser, getGoogleUserData,
  getMappedLongUrlOf
} from './database.js';
// import {getAllTemperature} from './database.js'
import { OAuth2Client } from 'google-auth-library';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());


// ========================================
// var server = http.createServer(app);

// // Create the settings object - see default settings.js file for other options
// var settings = {
//     httpAdminRoot:"/red",
//     httpNodeRoot: "/api",
//     userDir:"/home/nol/.nodered/",
//     functionGlobalContext: { }    // enables global context
// };

// // Initialise the runtime with a server and settings
// red.init(server,settings);

// // Serve the editor UI from /red
// app.use(settings.httpAdminRoot,RED.httpAdmin);

// // Serve the http nodes UI from /api
// app.use(settings.httpNodeRoot,RED.httpNode);


// middleware for server client 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
// ---------------------------------------------
async function sendMail(user, callback) {
  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    smtp_sasl_auth_enable: true,
    // smtp_sasl_security_options: anou,
    // service:'gmail',
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "himanshupatil6999@gmail.com",
      pass: "D2ECB9F5E31A893B84112AFD7C37561DB310"
    }
  });

  let mail = {
    from: 'himanshupatil6999@gmail.com',
    to: user,
    subject: " welcome to bank",
    Text: "your mail is activated"
  }
  console.log(mail)
  try {
    let info = await transporter.sendMail(mail);

    callback(info);
  } catch (error) {
    console.log(error)
  }


}




// ---------------------------------------------------

// otp email or phone registration
app.post('/sendOtp', (req, res) => {
  const username = req.body.username
  const userType = req.body.user_type
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);


    // otp send logic
    sendMail(username, info => {
      console.log(`the mail has been send ${otp}`);

    })


    const row = addNewUser(username, otp, userType)
    res.status(200).send(true)
  } catch (error) {
    res.status(401).send(false)
  }

});


app.post('/verifyUser', async (req, res) => {
  const username = req.body.username
  const resultdata = await verifyIsUsernameAlreadyExist(username);
  console.log(resultdata.length)
  if (resultdata.length>0) {
  res.send(true)
  }
  else {
    res.send(false)
  }
});

app.post('/verifyOtp', async (req, res) => {
  const otpReceived = req.body.otp
  const username = req.body.username

  const otpSent = await getOtp(username)
  try {
    if (otpSent[0].otp == otpReceived) {
      const row = await otpVerified(username)
      res.send(true)
    }
    else {
      res.send(false)
    }
  } catch (error) {
    res.send(false)
  }


});

// ----------------------------------------------------------------


// overall registration
app.post('/register', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const token = req.body.token
  const userType = req.body.user_type

  var hashedPassword;
  // password hashing
  await bcrypt
    .genSalt(10)
    .then(salt => {
      console.log('Salt: ', salt)
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      console.log('Hash: ', hash);
      hashedPassword = hash
    })
    .catch(err => console.error(err.message))



  //------------------------------

  // if (userType === "Email") {
  try {
    const row = await isOtpVerified(username)

    if (row[0].otp == "verified") {

      const row = await registerNewUser(username,
        hashedPassword,
        userType)
      res.status(200).send("success")
    }
    else {
      res.status(400).send("fail")
    }
  } catch (error) {
    res.status(400).send("fail")
  }




});



// -------------------------------------------------------------

// Login 
// through registration
app.post("/login", async (req, res) => {

  console.log("here reach")
  const { username, password } = req.body

  // hashing check

  const row = await verifyIsUsernameAlreadyExist(username)
  if (row[0] != null) {
    const hashedPassword = await getExistUserPassword(username);
    async function comparePassword(plaintextPassword, hash) {
      const result = await bcrypt.compare(plaintextPassword, hash);
      return result;
    }
    const isvalid = await comparePassword(password, hashedPassword[0].password)

    if (isvalid) {
      const UUID = await getUUIDOfLoggedInUser(username)
      await updateLoginLog(UUID[0].UUID)

      res.status(200).json({
        "UUID": UUID[0].UUID,
        "user_type": UUID[0].user_type
      })
    } else {
      res.status(401).send(false)
    }
  }
  else {
    res.status(404).send(false)
  }

})
// through access token
app.post("/signInWithGoogle", async (req, res) => {
  console.log("reached")
  console.log(req.body)
  const { userId } = req.body
  const isExist = await googleSignInUserExist(userId)
  if (isExist) {
    await updateGoogleSignInLog(userId)
  }
  else {
    await addNewGoogleSignInUser(userId)

  }
  const resultData = await getGoogleUserData(userId)
  res.status(200).send(resultData)

})
// -------------------------------------------------------------------------------------
// URL management
app.post('/generateshortUrl', async (req, res) => {
  const { UUID, originalURL } = req.body
  const isExist = await isNewUrlAlreadyExist(originalURL)
  if (isExist) {
    const shortUrlOfOriginalUrl = await getShortUrlOf(originalURL)
    res.send([{ "response": shortUrlOfOriginalUrl[0].shortURL }]);
  }
  else {
    var shortUrl = "";
    // shorturllogic
    async function generateUrl() {
      const randomDigits = (Math.floor(Math.random() * 9000) + 1000)
      const randomChar1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
      const randomChar2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
      shortUrl = "http://localhost:3000/" + randomDigits + randomChar1 + randomChar2
      const isAlreadyShortUrl = await isAlreadyShortUrlExist(shortUrl);
      if (isAlreadyShortUrl) {
        generateUrl()
      }
    }
    try {
      generateUrl()
      const insertUrl = await insertShortUrl(originalURL, shortUrl, UUID)
      console.log(shortUrl)
      res.status(200).send([{ "response": shortUrl }])
    } catch (error) {
      res.status(400).send(error)
    }
  }
});


app.get('/getHistory/:UUID', async (req, res) => {
  const UUID = req.params.UUID;
  try {
    const resultData = await getUserUrlHistory(UUID)
    res.status(200).send(resultData)
  } catch (error) {
    res.status(400).send("fail")
  }
});


app.post('/updateUrl', async (req, res) => {
  const { UUID, longOldUrl, longNewUrl } = req.body;
  try {
    const Exist = await isNewUrlAlreadyExist(longNewUrl)
    if (!Exist) {
      const resultData = await modifyUrlData(UUID, longOldUrl, longNewUrl)
      res.status(200).send("success")
    }
    else {
      res.status(400).send("fail")
    }
  } catch (error) {
    res.status(400).send("fail")
  }
});

app.post("/deleteUrl", async (req, res) => {
  const { longUrl } = req.body
  try {
    const resultData = await deleteUrlData(longUrl)
    res.send(true)
  } catch (error) {
    res.status(400).send(error)
  }

})
// ----------------------------------------------------------------------------------------
// reset Password
app.post("/resetPassword", async (req, res) => {
  var { username,
    password,
    userType } = req.body
  var hashedPassword;
  // password hashing
  await bcrypt
    .genSalt(10)
    .then(salt => {
      console.log('Salt: ', salt)
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      console.log('Hash: ', hash);
      hashedPassword = hash
    })
    .catch(err => console.error(err.message))
  //------------------------------

  if (userType == "Email" || userType == "mobile") {
    const row = await isOtpVerified(username)
    if (row[0].otp == "verified") {

      const row = await resetPassword(username,
        hashedPassword,
        userType)
      res.status(200).send("success")
    }
    else {
      res.status(400).send("fail")
    }
  }
})

app.get("/:shortURL", async (req, res) => {
  const short = req.params.shortURL
  const shortURL = "http://localhost:3000/" + short
  console.log(shortURL)
  const longURL = await getMappedLongUrlOf(shortURL)
  console.log("hererr")
  console.log(longURL)


  if (longURL.length > 0) {

    res.redirect(longURL[0].originalURL)
  }
  else {
    res.redirect("http://localhost:4200/errorpage")
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});



