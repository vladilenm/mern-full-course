const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const Trade = require('../models/Trade')
const User = require('../models/User')
const Portfolio = require('../models/Portfolio')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('Glldf43iII')

//'/api/trade/go'
router.post('/go', async (req, res) => {
    try {
        const {goTrade} = req.body
        if (goTrade) {

            console.log('Торговля запущенна')
                
            const user = await User.find({ traider: "ag", startTrading: "1" })
                
            const portfolio = await Portfolio.find({ flag: "1" })
            
            async function TraidStarWar () {
                
                user.map(client =>{
                    let apiKey = client.apiPub
                    let apiSec = cryptr.decrypt(client.apiSec)
                    let email = client.email
                    let balance = client.balance                                               

                    const Binance = require('node-binance-api')
                    const binance = new Binance().options({
                        APIKEY: apiKey,
                        APISECRET: apiSec
                    })

                    //расчет текущего баланса                
                    function BalanceNow(myCoin, tickPrice){                        
                        binance.balance(function(error, balances) {
                            try{
                                if (balances[myCoin].available !== 0){
                                    let blnInUsdt = balances[myCoin].available * tickPrice
                                    //console.log('Баланс по ', myCoin,' в USDT:', blnInUsdt)

                                    const control = Trade.find({email: email, tick: myCoin}, function(err, docs){                            
                                        if (docs.length) {
                                            Trade.updateOne({email: email, tick: myCoin}, { blnUsdt: blnInUsdt }, function(err, result){
                                            })
                                        } else {
                                            console.log('Баланс еще не записан')
                                            const trade = new Trade({ tick: myCoin, blnUsdt: blnInUsdt, email })    
                                            trade.save()
                                        }
                                    })
                                }

                                //Добавляем позицию по USDT
                                if (balances.USDT.available !== 0){
                                    let blnUsdt = balances.USDT.available
                                    //console.log('Баланс USDT ', blnUsdt)

                                    const control = Trade.find({email: email, tick: 'USDT'}, function(err, docs){                            
                                        if (docs.length) {
                                            Trade.updateOne({email: email, tick: 'USDT'}, { blnUsdt: blnUsdt }, function(err, result){
                                            })
                                        } else {
                                            //console.log('Баланс еще не записан')
                                            const trade = new Trade({ tick: 'USDT', blnUsdt: blnUsdt, email })    
                                            trade.save()
                                        }
                                    })
                                }
                            } catch(err){}
                        })                                            
                    } 

                    async function BuyFunct(myTick, quantity, myTickPriceBuy){
                        await binance.buy(myTick, quantity, myTickPriceBuy, {type:'LIMIT'}, (error, response) => {
                            console.info('Пара: ', myTick, "Limit Buy response", response)                                                                                                           
                        })
                    }

                    async function SellFunct(myTick, quantity, myTickPriceSell){
                        await binance.sell(myTick, quantity, myTickPriceSell, {type:'LIMIT'}, (error, response) => {
                            console.info('Пара: ', myTick, "Limit Sell response", response) 
                        })
                    }

                    //Массив инструментов 
                    portfolio.map(instrument => {
                        let myTick = instrument.tick                        
                        var myCoin = myTick.substring(0,3)
                        let quantity = instrument.quantity
                        let kBalance = instrument.kBalance                    
                        let startLine = instrument.startLine
                        let stopLine = instrument.stopLine
                        let kBalanceStop = instrument.kBalanceStop
                        let hardStop = instrument.hardStop
                        let flag = instrument.flag 

                        if (myTick.length == 8){myCoin = myTick.substring(0,4)} else {myCoin = myTick.substring(0,3)}
                        
                        binance.balance(function(error, balances) {
                            if (typeof balances.USDT !== "undefined") {
                                let USDTBalance = balance        
                                
                                let coinBalances = USDTBalance * kBalance
                                binance.prices(function(error, ticker) {
                                    try{
                                        let tickPrice = ticker[myTick]

                                        let myTickPriceBuy = (tickPrice * 1.005).toFixed(8)                                    
                                        let myTickPriceSell = (tickPrice * 0.995).toFixed(8)                                        
                                        let quantityControl = (coinBalances/tickPrice).toFixed(8)                                                                     
                                        
                                        //Вызываем ф-ю для рассчета текущего баланса                                        
                                        BalanceNow(myCoin, tickPrice)
                                        
                                    
                                        binance.balance(function(error, balances) {
                                            if (typeof balances[myCoin] !== "undefined") {
                                                let nowPositions = balances[myCoin].available                                                 
                                                
                                                let startPrice = startLine
                                                let stopPrice = stopLine
                                                console.log(email, 'пара: ', myTick,', контрольный объем: ', quantityControl, 'сейчас открыто: ', nowPositions, ' уровень входа: ', startPrice, ', выхода: ', stopPrice, ', текущая цена: ', tickPrice, ', цена входа: ', myTickPriceBuy, ', цена выхода: ', myTickPriceSell)

                                                //Проверяем флаг принудительной фиксации
                                                if (hardStop == 0){
                                                    //Проверяем условия и входим в позицию
                                                    if (tickPrice*1 < startPrice*1 && tickPrice !== "undefined" && startPrice !== "undefined") {
                                                        if (nowPositions*1 < quantityControl*1) {
                                                            BuyFunct(myTick, quantity, myTickPriceBuy)
                                                        }
                                                    } else {
                                                        //console.log('Заявка уже выставленна или не выполненно условие входа')                                           

                                                        if (tickPrice !== "undefined" && stopPrice !== "undefined" && tickPrice*1 >= stopPrice*1) {
                                                            if (nowPositions*1 >= quantity*1){
                                                                SellFunct(myTick, quantity, myTickPriceSell)
                                                            }
                                                        }
                                                    }
                                                }
                                                if ((hardStop == 1)&&(nowPositions*1 >= quantityControl*kBalanceStop)&&(nowPositions*1 >= quantity*1)){
                                                    SellFunct(myTick, quantity, myTickPriceSell)
                                                }
                                            }
                                        })
                                    } catch(err){}
                                })    
                            }
                        })
                    })
                })
            }
            global.timerIdControlTrade = setInterval (() => TraidStarWar (), 60000)

        } else { 
            clearInterval(timerIdControlTrade)
            console.log("Торговля остановленна") 
        }
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

module.exports = router

