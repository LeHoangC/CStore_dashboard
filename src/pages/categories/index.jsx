import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Pencil, Trash2, LockKeyholeOpen, LockKeyhole } from 'lucide-react'

import Header from '../../components/common/Header'
import ConfirmModal from '../../components/ui/ConfirmModal'
import useModal from '../../hooks/useModal'
import { useCategories, useDeleteCategoryMutation } from '../../hooks/useCategory'

const CategoryPage = () => {
    const { data } = useCategories()

    const [categories, setCategories] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const { modalState, openModal, closeModal } = useModal()

    const { mutate: deleteCategory } = useDeleteCategoryMutation()

    const onDelete = (id) => {
        deleteCategory(id)
        closeModal()
    }

    useEffect(() => {
        setCategories(data)
    }, [data])

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        const filtered = data.filter((cate) => cate.name.toLowerCase().includes(term))
        setCategories(filtered)
    }

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Danh mục" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-100">Tất cả danh mục</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>

                        <Link
                            to="create"
                            className="bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-normal py-2 px-4 transition duration-100 w-full sm:w-auto"
                        >
                            Thêm danh mục
                        </Link>
                    </div>

                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Tên danh mục
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Số lượng sản phẩm
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-700">
                                {categories?.map((cate) => (
                                    <motion.tr
                                        key={cate._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                        {cate.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-100">{cate.name}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-300">{cate.productCount}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-300">
                                                {cate.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                                                <Link to={`edit/${cate._id}`}>
                                                    <Pencil size={18} />
                                                </Link>
                                            </button>
                                            {cate.isActive ? (
                                                <button
                                                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                                                    onClick={() => openModal(cate._id, 'lock')}
                                                >
                                                    <LockKeyholeOpen size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-red-400 hover:text-red-300 mr-2"
                                                    onClick={() => openModal(cate._id, 'unlock')}
                                                >
                                                    <LockKeyhole size={18} />
                                                </button>
                                            )}
                                            {!cate.productCount && (
                                                <button
                                                    className="text-red-400 hover:text-red-300"
                                                    onClick={() => openModal(cate._id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {/* <ConfirmModal
                            isOpen={modalState.isOpen}
                            onClose={closeModal}
                            id={modalState.itemId}
                            title={
                                modalState.action === 'lock' ? 'Xác nhận khóa sản phẩm' : 'Xác nhận mở khóa sản phẩm'
                            }
                            message={
                                modalState.action === 'lock'
                                    ? 'Bạn có chắc chắn muốn khóa sản phẩm này không?'
                                    : 'Bạn có chắc chắn muốn mở khóa sản phẩm này không?'
                            }
                            onConfirm={onConfirm}
                        /> */}

                        <ConfirmModal
                            isOpen={modalState.isOpen}
                            onClose={closeModal}
                            id={modalState.itemId}
                            title={'Xóa danh mục'}
                            message={'Bạn có chắc muốn xóa danh mục này không'}
                            onConfirm={onDelete}
                        />
                    </div>
                </motion.div>
            </main>
        </div>
    )
}
export default CategoryPage
