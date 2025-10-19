import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment'
import { FormatPrice } from '../utils/use-price'
import Header from '../components/common/Header'
import { ORDER_STATUS } from '../constants'
import { useOrder, useUpdateStatusOrderMutation } from '../data/order'

const OrderDetailPage = () => {
    const { orderId } = useParams() // Lấy orderId từ URL
    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState(null)

    // Custom styles cho react-select
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#374151',
            borderColor: '#4B5563',
            color: '#D1D5DB',
            padding: '2px',
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#3B82F6',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#D1D5DB',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#374151',
            borderRadius: '8px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4B5563' : state.isFocused ? '#6B7280' : '#374151',
            color: '#D1D5DB',
            '&:hover': {
                backgroundColor: '#6B7280',
            },
        }),
    }

    const { data: order, isPending } = useOrder(orderId)

    const { mutate: updateStatusOrder } = useUpdateStatusOrderMutation()
    const handleUpdateStatusOrder = () => {
        updateStatusOrder({ orderId, newStatus: selectedStatus.value })
    }

    if (isPending) {
        return <div className="text-white flex-1 relative z-10">Đang tải...</div>
    }

    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title={`Chi tiết đơn hàng #${order.order_trackingNumber}`} />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Thông tin chi tiết đơn hàng */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-100 mb-4">Thông tin đơn hàng</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Mã đơn hàng:</span>
                                    <span className="text-gray-100">{order.order_trackingNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Khách hàng:</span>
                                    <span className="text-gray-100">{order.order_user.user_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Tổng tiền hàng:</span>
                                    <span className="text-gray-100">
                                        {FormatPrice({ amount: order.order_checkout.totalPrice })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Giảm giá:</span>
                                    <span className="text-gray-100">
                                        {FormatPrice({ amount: order.order_checkout.discount })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Tổng thanh toán:</span>
                                    <span className="text-gray-100">
                                        {FormatPrice({ amount: order.order_checkout.totalCheckout })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Ngày đặt hàng:</span>
                                    <span className="text-gray-100">
                                        {moment(order.createdAt).format('HH:mm DD/MM/YYYY')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Ô select trạng thái */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-100 mb-4">Cập nhật trạng thái</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-400">Trạng thái hiện tại:</span>
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            ORDER_STATUS.find((s) => s.value === order.order_status)?.color
                                        }`}
                                    >
                                        {ORDER_STATUS.find((s) => s.value === order.order_status)?.label}
                                    </span>
                                </div>

                                <Select
                                    options={ORDER_STATUS}
                                    value={ORDER_STATUS.find((s) => s.value === order.order_status)}
                                    onChange={setSelectedStatus}
                                    styles={customStyles}
                                    className="w-full"
                                />

                                <button
                                    onClick={handleUpdateStatusOrder}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cập nhật trạng thái
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Nút quay lại */}
                    <button
                        onClick={() => navigate('/orders')}
                        className="text-gray-100 border border-gray-600 hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                        Quay lại danh sách đơn hàng
                    </button>
                </motion.div>
            </main>
        </div>
    )
}

export default OrderDetailPage
