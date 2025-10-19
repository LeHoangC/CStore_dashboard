const PRODUCT_TYPE = [
    { option: "Sản phẩm không có biến thể", value: "simple" },
    { option: "Sản phẩm có biến thể", value: "variable" },
]

const ORDER_STATUS = [
    { value: 'pending', label: 'Pending', color: 'bg-red-100 text-red-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'shipped', label: 'Shipped', color: 'bg-blue-100 text-blue-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
]


export { PRODUCT_TYPE, ORDER_STATUS }