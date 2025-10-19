import { motion } from 'framer-motion'

import Header from '../../components/common/Header'
import StatCard from '../../components/common/StatCard'

import { AlertTriangle, Package, TrendingUp } from 'lucide-react'
import CategoryDistributionChart from '../../components/overview/CategoryDistributionChart'
import SalesTrendChart from '../../components/products/SalesTrendChart'
import ProductsTable from '../../components/products/ProductsTable'
import { Archive } from 'lucide-react'
import { useAnalyticProduct } from '../../data/product'

const ProductsPage = () => {
    const {
        data: { totalProducts = 0, totalProductDraft = 0, totalLowStockProducts = 0, categoryDistribution = [] } = {},
    } = useAnalyticProduct()

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Quản lý sản phẩm" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Tổng sản phẩm" icon={Package} value={totalProducts} color="#6366F1" />
                    <StatCard name="Bán chạy nhất" icon={TrendingUp} value={0} color="#10B981" />
                    <StatCard name="Còn ít hàng" icon={AlertTriangle} value={totalLowStockProducts} color="#F59E0B" />
                    <StatCard name="Sản phẩm nháp" icon={Archive} value={totalProductDraft} color="#EF4444" />
                </motion.div>

                <ProductsTable />

                {/* CHARTS */}
                <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
                    <SalesTrendChart />
                    <CategoryDistributionChart categoryData={categoryDistribution} />
                </div>
            </main>
        </div>
    )
}
export default ProductsPage
