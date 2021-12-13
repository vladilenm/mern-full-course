const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.get('/access', auth, async (req, res) => {
  try {
    const offices = await User.find({ _id: req.user.userId }) 
    //передаем данные клиенту
    res.json(offices)     
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
