const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Office = require('../models/Office')
const User = require('../models/User')
const Trade = require('../models/Trade')
const auth = require('../middleware/auth.middleware')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('Glldf43iII')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const offices = await User.find({ _id: req.user.userId })
    //console.log(offices)

    offices.map (iter => {
      let email = iter.email
      let startTrading = iter.startTrading
      let balance = iter.balance
      
      const pTrade = Trade.find({ email: email }, function(err, docs){

        var blnUsdt = 0
        const quan = docs.map (iterDocs => {
          blnUsdt = blnUsdt*1 + (iterDocs.blnUsdt)*1          
        })
        
        let pnl = blnUsdt - balance
        

        let union = [{email, startTrading, balance, blnUsdt, pnl}]
        console.log(union)
        
        //передаем данные клиенту
        res.json(union)
      })        
    })    
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/positions', auth, async (req, res) => {
  try {
    const offices = await User.find({ _id: req.user.userId })    

    offices.map (iter => {
      let email = iter.email
      
      const positions = Trade.find({ email: email }, function(err, docs){        

        //передаем данные клиенту
        res.json(docs)
      })        
    })    
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
