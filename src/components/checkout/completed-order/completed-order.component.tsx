import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'


import './completed-order.style.scss'

type CompletedOrderProps = {
  clientName: string | undefined
}

const CompletedOrder = ({ clientName = '' }: CompletedOrderProps) => {
  return (
    <div className='finish-step-container'>
      <FontAwesomeIcon icon={faCheckCircle} />
      <h3 className='margin-top-20px margin-bottom-20px'>Congratulations, {clientName}!</h3>
      <span>
        Your order has been placed.
      </span>
      <span>
        You can see details for current order in profile/orders 
        {/* TODO: link to current order in profile? */}
      </span>
      <span>
        You will receive an email with tracking information once your goods have been shipped.
        {/* TODO: Email: Hey "Client_Name", Thanks so much for your purchase! ... */}
      </span>
      <Link className='margin-top-20px' to='/shop'>Continue Shopping</Link>
    </div>
  )
}

export default CompletedOrder