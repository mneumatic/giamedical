const express = require('express')
const nodeMailer = require('nodemailer')
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const router = express.Router()

router.get('/', csrfProtection, (req, res, next) => {
  res.render('index', {
    title: 'GIA Medical',
    sent: req.query.valid,
    csrfToken: req.csrfToken()
  })
})

router.get('/privacy-policy', (req, res, next) => {
  res.render('privacy', { title: 'Privacy Policy | GIA Medical' })
})

router.get('/terms-of-service', (req, res, next) => {
  res.render('tos', { title: 'Terms of Service | GIA Medical' })
})

router.post('/contact', csrfProtection, (req, res, next) => {
  const transporter = transportSwitch()

  let directTo
  if (req.body.subject === 'general') directTo = process.env.NM_MAILOPTIONS_TO
  if (req.body.subject === 'parts-ordering') directTo = process.env.NM_MAILOPTIONS_TO_PARTS
  if (req.body.subject === 'support') directTo = process.env.NM_MAILOPTIONS_TO_SUPPORT

  const mailOptions = {
    from: req.body.name + ' ' + req.body.email,
    to: directTo,
    subject: req.body.subject,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.redirect('/?valid=' + encodeURIComponent('error'))
    }
    console.log('Message sent: %s', info.messageId)
    res.redirect('/?valid=' + encodeURIComponent('email'))
  })
})

function transportSwitch () {
  let transporter
  if (process.env.MODE === 'production') {
    transporter = nodeMailer.createTransport({
      host: process.env.NM_TRANSPORTER_HOST,
      port: process.env.NM_TRANSPORTER_PORT,
      secure: false
    })
  } else {
    transporter = nodeMailer.createTransport({
      host: process.env.DEV_TRANSPORTER_HOST,
      port: process.env.DEV_TRANSPORTER_PORT,
      auth: {
        user: process.env.DEV_TRANSPORTER_USER,
        pass: process.env.DEV_TRANSPORTER_PASS
      }
    })
  }
  return transporter
}

module.exports = router
