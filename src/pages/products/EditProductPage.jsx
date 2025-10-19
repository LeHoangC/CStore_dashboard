import React from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/common/Header'
import CreateOrUpdateProductForm from '../../components/products/product-form'
import { useProduct } from '../../data/product'

const EditProductPage = () => {
    const { slug } = useParams()
    const { data: product, isLoading } = useProduct(slug)

    if (isLoading) {
        return
    }

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Tạo sản phẩm mới" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="mb-20">
                    <CreateOrUpdateProductForm initialValue={product} />
                </div>
            </main>
        </div>
    )
}

export default EditProductPage
