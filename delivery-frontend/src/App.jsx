import OrdersPage from './pages/OrdersPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import CreateOrderPage from './pages/CreateOrderPage'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App()
{
    return <Routes>
        <Route
            path="/"
            element={<OrdersPage/>}
        />

        <Route
            path="/orders/:orderNumber"
            element={<OrderDetailsPage/>}
        />

        <Route
            path="/create"
            element={<CreateOrderPage />}
        />

        </Routes>
}

export default App