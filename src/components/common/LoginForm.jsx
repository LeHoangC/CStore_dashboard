import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { User, Lock } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { authApi } from '../../data/authentication'

const LoginForm = ({ isOpen, onClose, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: 'admin',
        password: 'admin',
    })

    const { login } = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault()

        const handleLogin = async () => {
            try {
                const data = await authApi.login(formData)
                login(data.user, data.tokens)

                // Reset form
                setFormData({ email: '', password: '' })

                // Close the login modal and notify parent
                onLoginSuccess?.()
                onClose()
            } catch (err) {
                console.error('Login error:', err)
            }
        }

        handleLogin()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-8 text-left align-middle shadow-xl transition-all border border-gray-700">
                                <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-100 mb-6">
                                    Đăng nhập Admin
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Tên đăng nhập
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-lg border border-gray-600 bg-gray-700 pl-11 pr-4 py-3 text-base text-gray-100 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                        >
                                            Mật khẩu
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block w-full rounded-lg border border-gray-600 bg-gray-700 pl-11 pr-4 py-3 text-base text-gray-100 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default LoginForm
