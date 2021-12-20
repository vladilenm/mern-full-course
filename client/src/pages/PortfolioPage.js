import React, {useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'

export const PortfolioPage = () => {
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    tick: '', quantity: '', kBalance: '', startLine: '', stopLine: '', kBalanceStop: '0', flag: '1'
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
      const data = await request('/api/portfolio/add', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }
  
  return (
    <div className="row">
      <div className="col s12 offset-s0">
        <h3>Добавление токена</h3>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Параметры</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите название токена в формате ИМЯUSDT"
                  id="tick"
                  type="text"
                  name="tick"
                  className="yellow-input"
                  value={form.tick}
                  onChange={changeHandler}
                />
                <label htmlFor="tick">Название токена БОЛЬШИМИ буквами</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите объем заявки на один шаг"
                  id="quantity"
                  type="text"
                  name="quantity"
                  className="yellow-input"
                  value={form.quantity}
                  onChange={changeHandler}
                />
                <label htmlFor="quantity">Объем</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите значение доли баланса на данный токен"
                  id="kBalance"
                  type="text"
                  name="kBalance"
                  className="yellow-input"
                  value={form.kBalance}
                  onChange={changeHandler}
                />
                <label htmlFor="kBalance">Доля баланса</label>
              </div>              

              <div className="input-field">
                <input
                  placeholder="Введите значение цены ниже которой встаем в позицию"
                  id="startLine"
                  type="text"
                  name="startLine"
                  className="yellow-input"
                  value={form.startLine}
                  onChange={changeHandler}
                />
                <label htmlFor="startLine">Линия старта</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите значение цены, выше которой мы фиксируем прибыль"
                  id="stopLine"
                  type="text"
                  name="stopLine"
                  className="yellow-input"
                  value={form.stopLine}
                  onChange={changeHandler}
                />
                <label htmlFor="stopLine">Линия стопа</label>
              </div>


              <div className="input-field">
                <input
                  placeholder="Введите долю баланса на фиксацию позиции от 0 до 1, где 0 - полная фиксация"
                  id="kBalanceStop"
                  type="text"
                  name="kBalanceStop"
                  className="yellow-input"
                  value={form.kBalanceStop}
                  onChange={changeHandler}
                />
                <label htmlFor="kBalanceStop">Доля баланса на фиксацию позиции</label>
              </div>              

              <div className="input-field">
                <input
                  placeholder="Чтобы отключить торговлю по токену введите 0"
                  id="flag"
                  type="text"
                  name="flag"
                  className="yellow-input"
                  value={form.flag}
                  onChange={changeHandler}
                />
                <label htmlFor="flag">Чтобы отключить торговлю по токену введите 0</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
