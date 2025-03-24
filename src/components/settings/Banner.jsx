import { SlidersHorizontal } from 'lucide-react'
import SettingSection from './SettingSection'
import Card from '../common/Card'
import FileInput from '../ui/File-input'
import { useFieldArray, useForm } from 'react-hook-form'
import { useBanners, useUpdateBannerMutation } from '../../hooks/useSetting'
import { useEffect } from 'react'
import Input from '../ui/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'lucide-react'
import { useState } from 'react'

const bannerSchema = yup.object().shape({
    banners: yup.array().of(
        yup.object().shape({
            title: yup.string().trim(),
            subtitle: yup.string(),
            buttonName: yup.string(),
            textColor: yup.string(),
            link: yup.string(),
            image: yup.object().required('Hình ảnh là bắt buộc'),
        })
    ),
})

const Banner = () => {
    const { data } = useBanners()

    const methods = useForm({
        defaultValues: {
            banners: [], // Nếu data chưa có, dùng mảng rỗng làm mặc định
        },
        resolver: yupResolver(bannerSchema),
    })

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = methods

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'banners',
    })

    useEffect(() => {
        if (data) {
            replace(data.banners) // Thay thế fields bằng data mới
        }
    }, [data, replace])

    const { mutate: handleUpdateBanners } = useUpdateBannerMutation()

    const onSubmit = (value) => {
        handleUpdateBanners(value)
    }

    return (
        <SettingSection icon={SlidersHorizontal} title={'Banner'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    {fields.map((item, index) => (
                        <Card key={item.id} className="space-y-4 mb-2">
                            <X className="float-right cursor-pointer" color="red" onClick={() => remove(index)} />
                            <Input label="Tiêu đề" {...register(`banners.${index}.title`)} />
                            <Input label="Nội dung banner" {...register(`banners.${index}.subtitle`)} />
                            <Input label="Tên nút bấm" {...register(`banners.${index}.buttonName`)} />
                            <div className="flex items-center">
                                <label className="block text-md font-medium text-white">Màu chữ</label>
                            </div>
                            <input
                                {...register(`banners.${index}.textColor`)}
                                type="color"
                                className="w-8 h-8 rounded-md cursor-pointer hover:border-blue-400 transition-colors duration-200"
                            />
                            <Input label="Link" {...register(`banners.${index}.link`)} />
                            <FileInput
                                control={control}
                                name={`banners.${index}.image`}
                                multiple={false}
                                error={errors.banners?.[index]?.image.message}
                            />
                        </Card>
                    ))}
                </div>

                <button
                    onClick={() => append({ title: '', subtitle: '', color: '#000000', buttonName: '', link: '' })}
                    className="mr-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
                >
                    Thêm banner
                </button>

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
                >
                    Lưu
                </button>
            </form>
        </SettingSection>
    )
}
export default Banner
