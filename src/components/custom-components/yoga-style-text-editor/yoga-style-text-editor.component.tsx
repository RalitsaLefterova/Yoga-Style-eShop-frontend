import ReactQuill from 'react-quill'

import './yoga-style-text-editor.style.scss'
import 'react-quill/dist/quill.snow.css'

type YogaStyleTextEditorProps = {
  fieldName: string,
  labelText: string,
  editorValue: string,
  onChange: (value: string) => void
}

const YogaStyleTextEditor = ({ fieldName, labelText, editorValue, onChange }: YogaStyleTextEditorProps) => {

  const  modules  = {
    toolbar: [
      // [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values 
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      ["bold", "italic", "underline", "strike"],
      // [{ color: [] }, { background: [] }],              // dropdown with defaults from theme
      // [{ 'align': [] }],
      [{ script:  "sub" }, { script:  "super" }],
      [
        "blockquote", 
        // "code-block"
      ],
      [{ list:  "ordered" }, { list:  "bullet" }],
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          
      // [{ 'direction': 'rtl' }],                         // text direction
      // ["link", "image", "video"],
      ["clean"],                                        // remove formatting button
    ],
  }

  const handleEditorChange = (content: string) => {
    onChange(content)
  }

  return (
    <div className='yoga-style-text-editor-container'>
      <label
        htmlFor={fieldName}
        className='yoga-style-label'
      >{labelText}</label>
      <ReactQuill 
        id={fieldName}
        className='yoga-style-text-editor'
        theme='snow'
        modules={modules}
        value={editorValue}
        placeholder='Write product description here...'
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default YogaStyleTextEditor