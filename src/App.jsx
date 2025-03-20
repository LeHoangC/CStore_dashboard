import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Sidebar from './components/common/Sidebar'

import OverviewPage from './pages/OverviewPage'
import ProductsPage from './pages/products'
import UsersPage from './pages/UsersPage'
import SalesPage from './pages/SalesPage'
import OrdersPage from './pages/OrdersPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import CreateProductPage from './pages/products/CreateProductPage'
import EditProductPage from './pages/products/EditProductPage'
import CategoryPage from './pages/categories'
import CreateCategoryPage from './pages/categories/CreateCategoryPage'
import EditCategoryPage from './pages/categories/EditCategoryPage'

function App() {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* BG */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>

            <Sidebar />
            <Routes>
                <Route path="/" element={<OverviewPage />} />

                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/create" element={<CreateProductPage />} />
                <Route path="/products/edit/:slug" element={<EditProductPage />} />

                <Route path="/category" element={<CategoryPage />} />
                <Route path="/category/create" element={<CreateCategoryPage />} />
                <Route path="/category/edit/:id" element={<EditCategoryPage />} />

                <Route path="/users" element={<UsersPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default App
