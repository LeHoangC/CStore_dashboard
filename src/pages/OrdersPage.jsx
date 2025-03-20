import { CheckCircle, Clock, DollarSign, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

import Header from '../components/common/Header'
import StatCard from '../components/common/StatCard'
import DailyOrders from '../components/orders/DailyOrders'
import OrderDistribution from '../components/orders/OrderDistribution'
import OrdersTable from '../components/orders/OrdersTable'
import { useAnalytic } from '../hooks/useOrder'
import { FormatPrice } from '../utils/use-price'

const OrdersPage = () => {
    const { data: { totalOrders, totalRevenue, dailyOrdersData = [], orderStatusData = [] } = {} } = useAnalytic()

    const totalOrderPending = orderStatusData?.find((value) => value?.name === 'pending')?.value || 0
    const totalOrderCompleted = orderStatusData?.find((value) => value?.name === 'delivered')?.value || 0

    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title={'Đơn hàng'} />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Orders" icon={ShoppingBag} value={totalOrders} color="#6366F1" />
                    <StatCard name="Pending Orders" icon={Clock} value={totalOrderPending} color="#F59E0B" />
                    <StatCard name="Completed Orders" icon={CheckCircle} value={totalOrderCompleted} color="#10B981" />
                    <StatCard
                        name="Total Revenue"
                        icon={DollarSign}
                        value={FormatPrice({ amount: totalRevenue, className: 'text-3xl' })}
                        color="#EF4444"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <DailyOrders dailyOrdersData={dailyOrdersData} />
                    <OrderDistribution orderStatusData={orderStatusData} />
                </div>

                <OrdersTable />
            </main>
        </div>
    )
}
export default OrdersPage
