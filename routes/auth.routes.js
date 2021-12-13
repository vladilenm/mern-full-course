const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('Glldf43iII');
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {    
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
    }

    const {email, password, apiPub, apiSec, traider, startTrading, balance, access} = req.body
        
    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const hashedApiSec = await cryptr.encrypt(apiSec)
    const dehashedApiSec = cryptr.decrypt(hashedApiSec) 
    
    //получаем стартовый баланс
    
                                                                 
    const Binance = require('node-binance-api');
    const binance = new Binance().options({
      APIKEY: apiPub,
      APISECRET: apiSec
    });  
                  
    binance.balance(function(error, balances) {
      if (typeof balances.USDT !== "undefined") {
        global.balanceStart = balances.USDT.available                                                                                                                                   
      }                                                                 
    })
    console.log (balanceStart)
    
    const user = new User({ email, password: hashedPassword, apiPub, apiSec: hashedApiSec, traider, startTrading, balance: balanceStart, access })
    
    await user.save()

                  

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret')
      // ,
      // { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })  

    //res.status(201).json({ message: 'Пользователь создан, нажмите ВОЙТИ' })

  } catch (e) {
    res.status(500).json({ message: 'При регистрации что-то пошло не так, попробуйте снова' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Неправильный email или пароль' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неправильный email или пароль' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret')
      // ,
      // { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
