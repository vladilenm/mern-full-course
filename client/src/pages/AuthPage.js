import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import logo from '../logo.svg'
import logoIota from '../iota-icon.svg'
import logoBat from '../bat-icon.svg'
import logoBnb from '../bnb-icon.svg'
import logoXrp from '../xrp-icon.svg'
import logoEos from '../eos-icon.svg'
import logoLtc from '../ltc-icon.svg'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: '', apiPub: '', apiSec: '', traider: 'ag', startTrading: '1', balance: '', access: '1', check: false
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row blue-grey lighten-5">
      
      <div class="col s12 white">
        <h1>
        <div class="col s10">        
            BiBot                
          </div> 
          <div class="col s2"> 
              <a class="btn-floating btn-large cyan pulse">               
                <img src={logo} alt="" class="circle responsive-img offset-l3" />
              </a>
          </div>
                       
        </h1>
      </div>
      <div class="col s12 white"><br></br></div>

      <div class="col s6">                      
          {/* <img src={logo} alt="" class="circle responsive-img" /> */}
          <h2>Что это?</h2>
          <p>BiBot - это робот для торговли на бирже Binance.</p>
          <h2>Как это работает?</h2>
          <p>Вы открываете счет на Binance (если у вас его еще нет), заводите на счет средства в USDT.</p>
          <p>Минимальный размер счета 1500 USDT.</p>
          <p>Создаете <a href="https://www.binance.com/ru/my/settings/api-management" target="_blanck">ключи API от счета на Binance</a>, разрешая спотовую торговлю в настройках ключей.</p>
          <p>Регистрируетесь на сайте, указывав свои ключи API, торговля начнется автоматически.</p>                         
      </div>
      <div className="col s6">
        
        <div className="card white">
          <div className="card-content black-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>
              </div>
          </div>

          <div className="card-content black-text">
            <span className="card-title">Для регистрации добавьте</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите ключ API"
                  id="apiPub"
                  type="text"
                  name="apiPub"
                  className="yellow-input"
                  value={form.apiPub}
                  onChange={changeHandler}
                />
                <label htmlFor="apiPub">API key</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите ключ API secret"
                  id="apiSec"
                  type="password"
                  name="apiSec"
                  className="yellow-input"
                  value={form.apiSec}
                  onChange={changeHandler}
                />
                <label htmlFor="apiSec">Secret key</label>
              </div>              

            </div>
            <div>
              <label>
                <input 
                  id="check"
                  type="checkbox" 
                  class="filled-in" 
                  name="check"              
                  value={!form.check}
                  onClick={changeHandler}
                />
                <span>Регистрируясь вы принимаете <a href="/agreement" target="_blanck">условия использования</a></span>
              </label>
              
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}              
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading, !form.check}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>

      <div class="col s12  white">
        <h4>Стоимость услуг</h4>
         <p> 
           В качестве вознаграждения мы берем абонентскую плату в размере 500 USDT в год.          
         </p>         
             
        <h4>Техническая поддержка</h4>
         <p>Если у вас есть вопросы, вы всегда можете задать их нам в <a href="https://t.me/+9D8dtRDl6B45NDky" target="_blanck">наш чат в телеграмме</a>.</p>        
       </div>
       
 

      <div class="col s12">        
        <h2>Основные валюты, используемые в торговле</h2> 
        
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s1">
                <img src={logoIota} alt="" class="circle responsive-img" />
              </div>
              <div class="col s11">
                <span class="black-text">
                  Токен IOTA создан для поддержания экосистемы m2m (машина для машины), для рассчетов между приборами с ИИ.
                </span>
              </div>
            </div>
          </div>
        
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s1">
                <img src={logoBat} alt="" class="circle responsive-img" />
              </div>
              <div class="col s11">
                <span class="black-text">
                Basic Attention Token (BAT) - это экосистема управления интернет-рекламой, направленная на снижение влияния посредников.
                </span>
              </div>
            </div>
          </div> 
        
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s1">
                <img src={logoXrp} alt="" class="circle responsive-img" />
              </div>
              <div class="col s11">
                <span class="black-text">
                  XRP - токен поддерживает экосистему Ripple, которая развивает криптовалютную платформу для платёжных систем.
                </span>
              </div>
            </div>
          </div>        
        
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s1">
                <img src={logoEos} alt="" class="circle responsive-img" />
              </div>
              <div class="col s11">
                <span class="black-text">
                EOS поддерживает экосистему EOS.IO — блокчейн, являющийся платформой для создания децентрализованных приложений.
                </span>
              </div>
            </div>
          </div>
        
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s1">
                <img src={logoBnb} alt="" class="circle responsive-img" />
              </div>
              <div class="col s11">
                <span class="black-text">
                  BNB - это криптовалюта обеспечивающая экосистему биржи Binance. Дополнительно она позволяет нам экономим на комиссии 
                  биржы.
                </span>
              </div>
            </div>
          </div>
        
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s1">
                <img src={logoLtc} alt="" class="circle responsive-img" />
              </div>
              <div class="col s11">
                <span class="black-text">
                Litecoin - одноранговая интернет-валюта, которая включает в себя, почти нулевые по стоимости платежи в любую точку мира.
                </span>
              </div>
            </div>
          </div>
        
        <p>*Конечно это далеко не все проекты, в которые мы инвестируем</p>         
      </div>

      <div class="col s12 white center-align"><h6>Все права защищенны | Проект BiBot</h6></div> 

    </div>
  )
}
