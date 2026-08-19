import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL

function OrdersPage() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/api/orders`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить заказы')
                }

                return response.json()
            })
            .then(data => setOrders(data))
            .catch(error => console.error(error))
    }, [])

    return (
        <div>
            <h1 className="order-title">Список заказов</h1>
            {orders.length === 0 ? (
                <p className = "h2-ordersPage" >Заказов нет. Создайте свой первый заказ.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Город отправителя</th>
                            <th>Адрес отправителя</th>
                            <th>Город получателя</th>
                            <th>Адрес получателя</th>
                            <th>Вес груза</th>
                            <th>Дата забора груза</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>
                                    <Link to={`/orders/${order.orderNumber}`}>
                                        {order.orderNumber}
                                    </Link>
                                </td>
                                <td>{order.senderCity}</td>
                                <td>{order.senderAddress}</td>
                                <td>{order.recipientCity}</td>
                                <td>{order.recipientAddress}</td>
                                <td>{order.weight} кг</td>
                                <td>
                                    {new Date(order.cargoPickupDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Link to="/create" className="create-button">
                Создать заказ
            </Link>
        </div>
    )

}
export default OrdersPage;

