import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL

function CreateOrderPage() {
    const [senderCity, setSenderCity] = useState('')
    const [senderAddress, setSenderAddress] = useState('')
    const [recipientCity, setRecipientCity] = useState('')
    const [recipientAddress, setRecipientAddress] = useState('')
    const [weight, setWeight] = useState('')
    const [cargoPickupDate, setCargoPickupDate] = useState('')
    const navigate = useNavigate()

    async function createOrder(e) {
        e.preventDefault()

        const order = {
            senderCity,
            recipientCity,
            senderAddress,
            recipientAddress,
            weight: Number(weight),
            cargoPickupDate
        }

        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })

        if (!response.ok) {
            console.error('Ошибка создания заказа')
            return
        }

        navigate('/')

        console.log('Заказ создан')
    }

    return (
        <div>
            <form onSubmit={createOrder}>
                <h1 className="order-title">Введите заказ</h1>

                <input
                    required
                    placeholder="Город отправителя"
                    value={senderCity}
                    onChange={e => setSenderCity(e.target.value)}
                />

                <input
                    required
                    placeholder="Адрес отправителя"
                    value={senderAddress}
                    onChange={e => setSenderAddress(e.target.value)}
                />

                <input
                    required
                    placeholder="Город получателя"
                    value={recipientCity}
                    onChange={e => setRecipientCity(e.target.value)}
                />

                <input
                    required
                    placeholder="Адрес получателя"
                    value={recipientAddress}
                    onChange={e => setRecipientAddress(e.target.value)}
                />

                <input
                    required
                    placeholder="Вес груза"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                />

                <label>Дата забора груза</label>
                <input
                    required
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={cargoPickupDate}
                    onChange={e => setCargoPickupDate(e.target.value)}
                />

                <button type="submit">
                    Создать заказ
                </button>
            </form>
            <div>
                <Link to="/" className="back-link">
                    Вернуться к странице заказов
                </Link>
            </div>
        </div>
        
    )
}

export default CreateOrderPage