import React from 'react'
import {useHttp} from '../hooks/http.hook'
import {NavLink} from 'react-router-dom'
import {PortfolioPage} from './PortfolioPage'

export const TradePage = () => {
  const {loading, request, error, clearError} = useHttp()
      
    const tradeStart = async () => {
        try {
          const data = await request('/api/trade/go', 'POST', {goTrade: true})          
        } catch (e) {}
      }

    const tradeStop = async () => {
        try {
          const data = await request('/api/trade/go', 'POST', {goTrade: false})          
        } catch (e) {}
      }  

    return(
        <div className="row">
          <div class="col s12 white">
            <h1>Настройка параметров и регулирование торговли</h1>
          </div>
          <div class="col s6">
            <h3>Торговля</h3>            
            <div className="card-action">
                <button
                className="btn yellow darken-4"
                style={{marginRight: 10}}                
                onClick={tradeStart}                
                >
                    Начать торговлю
                </button>
                <button
                className="btn grey lighten-1 black-text"
                onClick={tradeStop}                                
                >
                    Остановить торговлю
                </button>
            </div>
          </div>  
          <div class="col s6">              
            <PortfolioPage />
          </div>
        </div>        
    )
}