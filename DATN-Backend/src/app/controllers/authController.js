const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { mailTemplate } = require('../../email')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const randomstring = require('randomstring')

let refreshTokens = []

const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(req.body.password, salt)

      // Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      })

      // Save to database
      await newUser.save().then(() => res.status(200).json(newUser))
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '1d' }
    )
  },

  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '7d' }
    )
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (!user) {
        res.status(404).json('Wrong username')
      } else if (!validPassword) {
        res.status(404).json('Wrong password')
      } else if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user)
        const refreshToken = authController.generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        })
        const { password, ...myInfo } = user._doc
        res.status(200).json({ myInfo, accessToken })
      }
    } catch (err) {
      console.log('err', err)
      res.status(500).json(err)
    }
  },

  // REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json("You're not authentication")
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json('Refresh token is not valid')
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err)
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
      // Create new access token, refresh token
      const newAccessToken = authController.generateAccessToken(user)
      const newRefreshToken = authController.generateRefreshToken(user)
      refreshTokens.push(newRefreshToken)
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      })
      res.status(200).json({ accessToken: newAccessToken })
    })
  },

  // LOGOUT
  logoutUser: async (req, res) => {
    console.log('LOGOUT', refreshTokens)
    res.clearCookie('refreshToken')
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    )
    res.status(200).json('Logged out')
  },

  // FORGOT_PASSWORD
  forgotPassword: async (req, res) => {
    const { username, email } = req.body

    const user = await User.findOne({ username: username, email: email })
    if (!user || !email) {
      res.status(404).json({ message: 'Wrong username or email' })
    }
    let newPassword
    try {
      newPassword = randomstring.generate(6)
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(newPassword, salt)

      user.password = hashed
      await user.save()
    } catch (error) {
      return res.status(500).json({ error })
    }
    console.log(user)
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: '465',
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.USER_GMAIL, // generated ethereal user
        pass: process.env.USER_PWD, // generated ethereal password
      },
    })
    // send mail with defined transport object
    try {
      let info = await transporter.sendMail({
        from: process.env.USER_GMAIL, // sender address
        to: email, // list of receivers
        subject: 'Message✔', // Subject line
        html: mailTemplate(username, email, newPassword), // html body
      })

      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      return res.json({ message: 'success' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ err: error })
    }
  },
}

module.exports = authController
