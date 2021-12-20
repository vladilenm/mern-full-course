import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const PayPage = () => {
  return (
    <div className="row">
      <div className="col s12 offset-s2">
        <h2>Оплата услуг</h2>
        <p>Вам необходимо оплатить наши услуги не позднее 10 дней после подключения счета.</p>        
        <h5>Реквизиты для оплаты:</h5>
        <p>Адрес: bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23</p>
        <p>MEMO: 461641504</p>
        <p>Внимание! Платеж производится только в USDT и только со счета, который вы подключили к нашей системе. MEMO указывать обязательно.</p>
      </div>
    </div>    
  )
}
