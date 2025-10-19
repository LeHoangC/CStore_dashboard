import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye } from 'lucide-react'
import moment from 'moment'
import * as XLSX from 'xlsx'
import Pagination from '../ui/pagination'
import { FormatPrice } from '../../utils/use-price'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ORDER_STATUS } from '../../constants'
import { useOrders } from '../../data/order'

moment.locale('vi')

const OrdersTable = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

    const { data: { data: orders = [], pagination = {}, orderDistribution = {} } = {}, refetch } = useOrders(
        page,
        debouncedSearchTerm
    )

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    const exportToExcel = () => {
        const dataExport = []
        const merges = []
        let currentRow = 1

        orders.forEach((order) => {
            const productCount = order.order_product.length

            order.order_product.forEach((product, index) => {
                const orderData = {
                    'Mã đơn hàng': index === 0 ? order.order_trackingNumber : '',
                    'Tên khách hàng': index === 0 ? order.order_user.user_name : '',
                    'Địa chỉ': index === 0 ? order.order_shipping.address : '',
                    'Trạng thái': index === 0 ? order.order_status : '',
                    'Tổng tiền hàng': index === 0 ? order.order_checkout.totalCheckout : '',
                    'Sản phẩm': product.product.name,
                    'Số lượng': product.quantity,
                    'Ngày đặt hàng': index === 0 ? moment(order.createdAt).format('HH:mm DD/MM/YYYY') : '',
                }

                dataExport.push(orderData)
            })

            if (productCount > 1) {
                for (let i = 0; i <= 7; i++) {
                    if ([0, 1, 2, 3, 4, 7].includes(i)) {
                        merges.push({
                            s: { r: currentRow, c: i },
                            e: { r: currentRow + productCount - 1, c: i },
                        })
                    }
                }
            }
        })

        const worksheet = XLSX.utils.json_to_sheet(dataExport)

        worksheet['!merges'] = merges

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')

        const fileName = `orders_${moment().format('YYYYMMDD')}.xlsx`
        XLSX.writeFile(workbook, fileName)
    }

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Danh sách đơn hàng</h2>
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    onClick={exportToExcel}
                >
                    Xuất báo cáo
                </button>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm ..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Mã đơn hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Khách hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tổng tiền
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Ngày đặt hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Hành động
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide divide-gray-700">
                        {orders?.map((order) => (
                            <motion.tr
                                key={order._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                    {order.order_trackingNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                    {order.order_user.user_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                    {FormatPrice({ amount: order.order_checkout.totalCheckout })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            ORDER_STATUS.find((status) => status.value === order.order_status)?.color ||
                                            'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {order.order_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {moment(order.createdAt).format('HH:mm DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <button
                                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                                        onClick={() => navigate(`/orders/${order._id}`)}
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <Pagination
                        total={pagination.totalItems}
                        color="secondary"
                        defaultCurrent={page}
                        defaultValue={1}
                        prevIconClassName="text-white"
                        nextIconClassName="text-white"
                        onChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </motion.div>
    )
}
export default OrdersTable
