import { useState } from 'react'
import LoginForm from './LoginForm'
import { useAuth } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'

const Header = ({ title }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const { user, logout } = useAuthStore()

    const handleLogout = () => {
        logout()
    }

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false)
    }

    return (
        <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
                {user ? (
                    <div className="flex gap-4">
                        <button className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                            Admin
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors"
                        >
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors"
                        >
                            Đăng nhập
                        </button>
                    </div>
                )}
            </div>

            <LoginForm
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </header>
    )
}
export default Header
