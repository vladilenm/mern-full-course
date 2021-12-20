const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const Portfolio = require('../models/Portfolio')


const router = Router()


// /api/portfolio/add
router.post(
  '/add',
  
  async (req, res) => {
  try {
    
    const {tick, quantity, kBalance, startLine, stopLine, kBalanceStop, flag} = req.body
    
    const candidate = await Portfolio.findOne({ tick })

    if (candidate) {
      return res.status(400).json({ message: 'Такое токен уже используется' })
    }
    
    const portfolio = new Portfolio({ tick, quantity, kBalance, startLine, stopLine, kBalanceStop, hardStop: "0", flag})

    await portfolio.save()

    res.status(201).json({ message: 'Позиция добавленна' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})  
  
  

module.exports = router
