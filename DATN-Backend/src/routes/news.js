const express = require('express')
const router = express.Router()

const newsController = require('../app/controllers/newsController')
const middlewareController = require('../app/controllers/middlewareController')

// ADD NEWS
router.post(
  '/',
  middlewareController.verifyTokenAndAdminAuth,
  newsController.createNews
)

// GET NEWS
router.get('/', newsController.getAllNews)
router.get('/find/:id', newsController.getNew)
router.put('/:id', newsController.updateNew)

module.exports = router
