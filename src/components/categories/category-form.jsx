import React from 'react'
import Description from '../ui/Description'
import Input from '../ui/Input'
import Card from '../common/Card'
import { useForm } from 'react-hook-form'
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../data/category'

const CreateOrUpdateCategoryForm = ({ initialValue }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValue
            ? { name: initialValue.name, description: initialValue.description }
            : {
                  name: '',
                  description: '',
              },
    })

    const { mutate: createCategory } = useCreateCategoryMutation()
    const { mutate: updateCategory } = useUpdateCategoryMutation()

    const onSubmit = async (value) => {
        if (initialValue) {
            updateCategory({ id: initialValue._id, ...value })
        } else {
            createCategory(value)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap pb-8 my-5 border-b border-dashed sm:my-8">
                <Description
                    title="Thông tin"
                    details="Thêm thông tin danh mục của bạn và thông tin cần thiết từ đây"
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />
                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label="Tên danh mục"
                        {...register('name', { required: 'Tên danh mục là bắt buộc' })}
                        className="mb-5"
                        required
                        error={errors?.name?.message}
                        autoFocus
                    />
                    <Input label="Mô tả" {...register('description')} className="mb-5" />
                </Card>
            </div>
            <button type="submit" className="float-right bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {initialValue ? 'Cập nhật' : 'Thêm danh mục'}
            </button>
        </form>
    )
}

export default CreateOrUpdateCategoryForm
