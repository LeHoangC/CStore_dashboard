import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import LoginForm from './LoginForm'
import { useAuthStore } from '../../store/authStore'
import { Bell } from 'lucide-react'
import { useMarkAsReadNotification, useNotifications } from '../../data/notification'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = ({ title }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 }) // State để lưu vị trí popup
    const bellRef = useRef(null) // Ref để lấy vị trí chuông

    const navigate = useNavigate()

    const { user, logout } = useAuthStore()

    const { data: { notifications = [], numUnRead = 0 } = {} } = useNotifications()
    const { mutate: handleMarkAsRead } = useMarkAsReadNotification()

    const handleLogout = () => {
        logout()
    }

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false)
    }

    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen)
    }

    // Tính toán vị trí popup dựa vào chuông
    useEffect(() => {
        if (isNotificationOpen && bellRef.current) {
            const bellRect = bellRef.current.getBoundingClientRect()
            // Đặt vị trí popup: dưới chuông (bellRect.bottom) và căn mép phải với chuông
            setPopupPosition({
                top: bellRect.bottom + window.scrollY + 8, // +8 để có khoảng cách nhỏ
                left: bellRect.right + window.scrollX - 320, // 320 là chiều rộng popup, căn mép phải
            })
        }
    }, [isNotificationOpen])

    const handleNotificationClick = (notificationId, isRead) => {
        if (!isRead) {
            handleMarkAsRead(notificationId)
        }
        setIsNotificationOpen(false)
    }

    // Component popup thông báo
    const NotificationPopup = () => (
        <div
            className="notification-popup fixed w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
            style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}
        >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-100">Thông báo</h2>
                <button onClick={() => {}} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                    Xem tất cả
                </button>
            </div>
            {notifications.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className={`relative p-4 pl-8 hover:bg-gray-800 transition-colors cursor-pointer
                          ${
                              notification.noti_is_read
                                  ? 'opacity-60'
                                  : 'bg-gray-800 before:content-[""] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-2.5 before:h-2.5 before:bg-blue-500 before:rounded-full'
                          }`}
                            onClick={() => handleNotificationClick(notification._id, notification.noti_is_read)}
                        >
                            <Link
                                to={`/orders/${notification?.noti_options?.orderId}`}
                                className="flex items-start gap-3"
                            >
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-100 mt-1">
                                        {notification.noti_content}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(notification.createdAt).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-400">Không có thông báo nào</p>
                </div>
            )}
        </div>
    )

    return (
        <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
                {user ? (
                    <div className="flex items-center gap-4">
                        <div
                            ref={bellRef}
                            className="relative inline-block cursor-pointer"
                            onClick={toggleNotifications}
                        >
                            {numUnRead > 0 && (
                                <span className="absolute -top-2 -right-2 z-20 text-white text-xs font-semibold px-1.5 py-0.5 bg-red-500 rounded-full shadow-md select-none">
                                    {numUnRead}
                                </span>
                            )}
                            <Bell className="w-6 h-6 text-white" />
                        </div>
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

            {/* Dùng Portal để render popup */}
            {isNotificationOpen && createPortal(<NotificationPopup />, document.body)}
        </header>
    )
}

export default Header
