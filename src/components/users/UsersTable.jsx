import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useUsers } from '../../hooks/useUser'
import { useEffect } from 'react'
import Pagination from '../ui/pagination'
import { Trash2 } from 'lucide-react'
import { CircleCheckBig } from 'lucide-react'
import { CircleX } from 'lucide-react'

const UsersTable = () => {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
    const { data: { data: dataUser = [], pagination = {} } = {}, isLoading } = useUsers(page, debouncedSearchTerm)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    if (isLoading) {
        return
    }

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Danh sách người dùng</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
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
                                Tên
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Role
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
                        {dataUser?.map((user) => (
                            <motion.tr
                                key={user._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                {user.user_name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-100">{user.user_name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">{user.user_email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                                        {user.user_role}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                                            user.user_status === 'active'
                                                ? 'bg-green-800 text-green-100'
                                                : 'bg-red-800 text-red-100'
                                        }`}
                                    >
                                        {user.user_status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {user.user_role !== 'admin' && (
                                        <>
                                            {user.user_status === 'active' ? (
                                                <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                                                    <CircleCheckBig size={18} />
                                                </button>
                                            ) : (
                                                <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                                                    <CircleX size={18} />
                                                </button>
                                            )}
                                            <button className="text-red-400 hover:text-red-300">
                                                <Trash2 size={18} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <Pagination
                        total={pagination.totalUser}
                        color="secondary"
                        defaultCurrent={page}
                        defaultValue={1}
                        prevIconClassName="text-white"
                        nextIconClassName="text-white"
                        onChange={(page) => setPage(page)}
                        pageSize={5}
                    />
                </div>
            </div>
        </motion.div>
    )
}
export default UsersTable
