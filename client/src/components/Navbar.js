import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import logo from '../logo.svg'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue accent-3" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">
          <a class="btn-floating btn-large cyan pulse">               
            <img src={logo} alt="" class="circle responsive-img offset-l3" />
          </a>
          {/* Ipotech */}
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">          
          <li><NavLink to="/office">Личный кабинет</NavLink></li>
          <li><NavLink to="/pay">Платежи</NavLink></li>
          {/* <li><NavLink to="/admin">Для сотрудников</NavLink></li> */}
          <li><a href="https://t.me/+ro8PnV2Bekg4YmYy" target="_blanck">Поддержка</a></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}
