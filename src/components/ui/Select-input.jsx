import Select from 'react-select'
import { Controller } from 'react-hook-form'
import { Asterisk } from 'lucide-react'

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

const customStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: '42px',
        background: '#1f2937',
        borderColor: state.isFocused ? '#3b82f6' : '#374151',
        boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
        borderRadius: '0.5rem',
        '&:hover': {
            borderColor: '#3b82f6',
        },
    }),
    menu: (base) => ({
        ...base,
        background: '#1f2937',
        border: '1px solid #374151',
        borderRadius: '0.5rem',
        marginTop: '4px',
    }),
    menuList: (base) => ({
        ...base,
        padding: '5px',
    }),
    option: (base, state) => ({
        ...base,
        background: state.isSelected ? '#3b82f6' : state.isFocused ? '#374151' : 'transparent',
        color: state.isSelected ? 'white' : '#9ca3af',
        padding: '8px 12px',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        '&:active': {
            background: '#3b82f6',
        },
    }),
    input: (base) => ({
        ...base,
        color: '#fff',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#fff',
    }),
    multiValue: (base) => ({
        ...base,
        background: '#374151',
        borderRadius: '0.375rem',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: '#fff',
        padding: '4px',
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: '#9ca3af',
        ':hover': {
            background: '#ef4444',
            color: 'white',
        },
        borderRadius: '0 0.375rem 0.375rem 0',
    }),
    placeholder: (base) => ({
        ...base,
        color: '#6b7280',
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isFocused ? '#3b82f6' : '#6b7280',
        '&:hover': {
            color: '#3b82f6',
        },
    }),
    clearIndicator: (base) => ({
        ...base,
        color: '#6b7280',
        '&:hover': {
            color: '#ef4444',
        },
    }),
}

const SelectInput = ({
    name,
    control,
    options = colourOptions,
    isMulti = false,
    placeholder = 'Chọn...',
    isClearable = true,
    isSearchable = true,
    label,
    error,
    getOptionLabel,
    getOptionValue,
    required,
}) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center">
                {label && <label className="block text-md font-medium text-white">{label}</label>}
                {required && <Asterisk size={12} />}
            </div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    const getValue = () => {
                        if (field.value) {
                            if (isMulti) {
                                return options.filter((option) =>
                                    field.value.includes(getOptionValue ? getOptionValue(option) : option._id)
                                )
                            } else {
                                return options.find(
                                    (option) => (getOptionValue ? getOptionValue(option) : option._id) === field.value
                                )
                            }
                        }
                        return isMulti ? [] : null
                    }

                    return (
                        <Select
                            {...field}
                            value={getValue()}
                            onChange={(selectedOption) => {
                                if (isMulti) {
                                    field.onChange(
                                        selectedOption
                                            ? selectedOption.map((option) =>
                                                  getOptionValue ? getOptionValue(option) : option._id
                                              )
                                            : []
                                    )
                                } else {
                                    field.onChange(
                                        selectedOption
                                            ? getOptionValue
                                                ? getOptionValue(selectedOption)
                                                : selectedOption._id
                                            : null
                                    )
                                }
                            }}
                            options={options}
                            isMulti={isMulti}
                            isClearable={isClearable}
                            isSearchable={isSearchable}
                            placeholder={placeholder}
                            classNamePrefix="select"
                            getOptionLabel={getOptionLabel}
                            getOptionValue={getOptionValue}
                            styles={customStyles}
                        />
                    )
                }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}

export default SelectInput
