const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
// Import Database
const database = require('./src/database')
// Create/retrieve database collection
const CovidForm = require('./models/CovidForm')

const app = express()

// View engine setup
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')))
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  // Debuggging
  //On default request, list the items in the database
  CovidForm.find()
    .then(items => console.log('Getting database items', items))
    .catch(err => console.error('Database Find Error: ', err))

  res.render('covid_form')
})



app.post('/send', (req, res) => {
  // Get date of form submission
  const datetime = new Date()

  //Emailing
  //Creating email template
  const output = `
    <p>You have a new COVID Tracking Form</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Date: ${datetime}</li>
      <li>Feels Sick: ${req.body.feelsSick}</li>
      <li>Recently Travelled outside of Canada in the last 14 days: ${req.body.recentTravel}</li>
      <li>Contacted someone with Covid without PPE: ${req.body.covidContacted}</li>     
    </ul>
    <h3>Comments</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "email@outlook.com", // generated ethereal user
      pass: "1234567"  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: `${req.body.name} <email@outlook.com>`, // sender address
    to: 'email@outlook.com', // list of receivers
    subject: 'COVID Precaution Form', // Subject line
    text: 'Covid Precaution Form', // plain text body
    html: output // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.redirect('/')
      return console.error('Transporter Error:', error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('covid_form', { msg: 'Email has been sent' });
  })

  // Saving in MongoDB
  const newForm = new CovidForm({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    feelsSick: req.body.feelsSick,
    recentTravel: req.body.recentTravel,
    covidContacted: req.body.covidContacted
  })

  newForm.save()
    .then(item => res.redirect('/'))
    .catch(err => console.error('Save Error:', err))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started...'))