import React from 'react'
import {NavLink} from 'react-router-dom'

export const PositionsCard = ({ links }) => {
  if (!links.length) {
    return <p>Нет открытых позиций или вы не авторизавались</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>Токен</th>
        <th>Оценочная стоимость</th>                 
      </tr>
      </thead>

      <tbody>
      { links.map((link) => {          
        return (
          <tr key={link._id}>
            
            <td>{link.tick}</td>             
            <td>{link.blnUsdt} USDT</td>                      
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}