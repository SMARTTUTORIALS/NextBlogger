
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const ReactQuill = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const BlogEditor = (props) => {

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['link', 'image'],

            ['clean'], // remove formatting button
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: true,
        },
    };
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
        'background',
        'bold',
        'color',
        'font',
        'code',
        'italic',
        'link',
        'size',
        'strike',
        'script',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
        'direction',
        'code-block',
        'image',
    ];


    const contentChangeHandler = (content) => {
        props.onChange(content);
    }

    return (
        <ReactQuill
            className='my-3 mx-1'
            modules={modules}
            formats={formats}
            theme="snow"
            onChange={contentChangeHandler}
            placeholder='Create an exciting blog post here...'
            value={props.defaultContent}
        />
    )
}

export default BlogEditor