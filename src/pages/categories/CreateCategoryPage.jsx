import Header from '../../components/common/Header'
import { AlertTriangle, DollarSign, Package, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import StatCard from '../../components/common/StatCard'
import CreateOrUpdateCategoryForm from '../../components/categories/category-form'

const CreateCategoryPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Tạo danh mục mới" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Products" icon={Package} value={1234} color="#6366F1" />
                    <StatCard name="Top Selling" icon={TrendingUp} value={89} color="#10B981" />
                    <StatCard name="Low Stock" icon={AlertTriangle} value={23} color="#F59E0B" />
                    <StatCard name="Total Revenue" icon={DollarSign} value={'$543,210'} color="#EF4444" />
                </motion.div>
                <div className="">
                    <CreateOrUpdateCategoryForm />
                </div>
            </main>
        </div>
    )
}

export default CreateCategoryPage
