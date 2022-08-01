import React from 'react'

import './user-orders.style.scss'

const UserOrders = () => {

  const orders = [
    {
      date: '12.03.2022',
      status: 'finished',
      total: 123
    },
    {
      date: '15.03.2022',
      status: 'ongoing',
      total: 52
    }
  ]

  const ordersTableHeader = () => {
    const headerCellsName = ['Created', 'Status', 'Total', ' ']
    return (
      <thead>
        <tr>
          {headerCellsName.map((cellName, index) => (
            <td key={index}>
              <span>{cellName}</span>
            </td>
          ))}
        </tr>
      </thead>
    )
  }

  const ordersTableBody = () => 
    <tbody>
      {orders.map(order => 
        <tr>
          <td>{order.date}</td>
          <td>{order.status}</td>
          <td>{order.total}</td>
          <td><button>details</button></td>
        </tr>
      )}
    </tbody>

  return (
    <>
    {orders.length === 0 ? 
      <div>no orders are placed yet</div> : 
      <table>
          {ordersTableHeader()}
          {ordersTableBody()}
      </table>
    }
    </>
  )
}

export default UserOrders