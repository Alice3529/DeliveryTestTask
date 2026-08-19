import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL

function OrderDetailsPage() 
{
    const [order, setOrder] = useState(null)
    const { orderNumber } = useParams()

    useEffect(() => {
        fetch(`${API_URL}/api/orders/${orderNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Заказ не найден')
                }

                return response.json()
            })
            .then(data => setOrder(data))
            .catch(error => console.error(error))
    }, [orderNumber])

     if (order === null)
     {
         return <p>Загрузка...</p>
    }

    return (
        <div>
            <h1 className="order-title">Детали заказа</h1>

            <div className="order-card">
                <div className="card-row">
                    <span className="card-label">Номер</span>
                    <span>{order.orderNumber}</span>
                </div>

                <div className="card-row">
                    <span className="card-label">Город отправителя</span>
                    <span>{order.senderCity}</span>
                </div>

                <div className="card-row">
                    <span className="card-label">Адрес отправителя</span>
                    <span>{order.senderAddress}</span>
                </div>

                <div className="card-row">
                    <span className="card-label">Город получателя</span>
                    <span>{order.recipientCity}</span>
                </div>

                <div className="card-row">
                    <span className="card-label">Адрес получателя</span>
                    <span>{order.recipientAddress}</span>
                </div>

                <div className="card-row">
                    <span className="card-label">Вес груза</span>
                    <span>{order.weight} кг</span>
                </div>

                <div className="card-row">
                    <span className="card-label">Дата забора груза</span>
                    <span>{new Date(order.cargoPickupDate).toLocaleDateString()}</span>
                </div>
            </div>

            <Link to="/" className="back-link">
                Вернуться к странице заказов
            </Link>
        </div>
    )

}

export default OrderDetailsPage