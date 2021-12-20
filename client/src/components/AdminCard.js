import React from 'react'
import {NavLink} from 'react-router-dom'
import {TradePage} from '../pages/TradePage'

export const AdminCard = ({ links }) => {
  if (!links.length) {
    return <h5><NavLink to="/">Войдите в систему</NavLink></h5>
  }

  return (
    <div>
      
      { links.map((link) => {
          let access = ''
          if (link.access == 5) {
            access = <TradePage />
          } else {
            access = 'Войдите под учетной записью администратора'
          }
        return (
          <tr key={link._id}>
            <td>{access}</td>                     
          </tr>
        )
      }) }
      
    </div>
  )
}