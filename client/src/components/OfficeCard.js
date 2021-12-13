import React from 'react'
import {NavLink} from 'react-router-dom'

export const OfficeCard = ({ links }) => {
  if (!links.length) {
    return <p>Что-то пошло не так. Попробуйте обновить страницу. Если не поможет нажмите кнопку "Выйти" в верхнем правом углу и авторезуйтесь снова.</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>Email</th>
        <th>Статус управления</th>
        <th>Стартовый баланс</th>
        <th>Текущий баланс</th>
        <th>PNL (Прибыль)</th>         
      </tr>
      </thead>

      <tbody>
      { links.map((link) => {
          let status = ''
          if (link.startTrading == 1) {
              status = 'Активно'
          } else {
            status = 'Ожидает оплаты'
          }
        return (
          <tr key={link._id}>
            
            <td>{link.email}</td>
            <td>{status}</td> 
            <td>{link.balance} USDT</td> 
            <td>{link.blnUsdt}</td> 
            <td>{link.pnl}</td>         
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}