import { Asterisk } from 'lucide-react'
import React, { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = forwardRef(({ label, name, control, placeholder = 'Mô tả...', required }, ref) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
        ],
    }

    return (
        <div className="w-full">
            <style>
                {`
                    .quill {
                        background: #1e293b;
                        border-radius: 0.375rem;
                        border: 1px solid rgb(75 85 99);
                    }
                    .ql-toolbar {
                        border-top-left-radius: 0.375rem;
                        border-top-right-radius: 0.375rem;
                        border-bottom: 1px solid rgb(75 85 99) !important;
                        background: #1e293b;
                        padding: 12px 8px !important;
                    }
                    .ql-container {
                        border-bottom-left-radius: 0.375rem;
                        border-bottom-right-radius: 0.375rem;
                        background: #1e293b;
                        min-height: 200px;
                    }
                    .ql-toolbar.ql-snow, .ql-container.ql-snow {
                        border: none;
                    }
                    .ql-toolbar .ql-stroke {
                        stroke: #94a3b8;
                    }
                    .ql-toolbar .ql-fill {
                        fill: #94a3b8;
                    }
                    .ql-toolbar .ql-picker {
                        color: #94a3b8;
                    }
                    .ql-toolbar .ql-picker-options {
                        background: #1e293b;
                        border-color: rgb(75 85 99);
                    }
                    .ql-editor {
                        color: #e2e8f0;
                        font-size: 1rem;
                        padding: 16px;
                        line-height: 1.6;
                    }
                    .ql-editor.ql-blank::before {
                        color: #64748b;
                        font-style: normal;
                        font-size: 1rem;
                    }
                    .ql-snow.ql-toolbar button:hover,
                    .ql-snow .ql-toolbar button:hover,
                    .ql-snow.ql-toolbar button:focus,
                    .ql-snow .ql-toolbar button:focus,
                    .ql-snow.ql-toolbar button.ql-active,
                    .ql-snow .ql-toolbar button.ql-active,
                    .ql-snow.ql-toolbar .ql-picker-label:hover,
                    .ql-snow .ql-toolbar .ql-picker-label:hover,
                    .ql-snow.ql-toolbar .ql-picker-label.ql-active,
                    .ql-snow .ql-toolbar .ql-picker-label.ql-active,
                    .ql-snow.ql-toolbar .ql-picker-item:hover,
                    .ql-snow .ql-toolbar .ql-picker-item:hover,
                    .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
                    .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
                        color: #3b82f6;
                    }
                    .ql-snow.ql-toolbar button:hover .ql-stroke,
                    .ql-snow .ql-toolbar button:hover .ql-stroke,
                    .ql-snow.ql-toolbar button:focus .ql-stroke,
                    .ql-snow .ql-toolbar button:focus .ql-stroke,
                    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
                    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
                    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
                    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke {
                        stroke: #3b82f6;
                    }
                    .ql-snow.ql-toolbar button:hover .ql-fill,
                    .ql-snow .ql-toolbar button:hover .ql-fill,
                    .ql-snow.ql-toolbar button:focus .ql-fill,
                    .ql-snow .ql-toolbar button:focus .ql-fill,
                    .ql-snow.ql-toolbar button.ql-active .ql-fill,
                    .ql-snow .ql-toolbar button.ql-active .ql-fill {
                        fill: #3b82f6;
                    }
                `}
            </style>
            <div className="flex items-center">
                {label && <label className="block text-md font-medium text-white">{label}</label>}
                {required && <Asterisk size={12} />}
            </div>
            <ReactQuill
                ref={ref}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                theme="snow"
                modules={modules}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    )
})

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
