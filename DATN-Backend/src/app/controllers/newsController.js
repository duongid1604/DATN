const News = require('../models/News')

const newsController = {
  // CREATE NEWS
  createNews: async (req, res) => {
    const news = new News(req.body)
    try {
      const savedNews = await news.save()
      res.status(200).json(savedNews)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // GET ALL NEWS
  getAllNews: async (req, res) => {
    try {
      const news = await News.find()
      res.status(200).json(news)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  updateNew: async (req, res) => {
    try {
      const updatedNew = await News.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedNew)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  getNew: async (req, res) => {
    try {
      const New = await News.findById(req.params.id)
      res.status(200).json(New)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = newsController
