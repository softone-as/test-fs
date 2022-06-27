import React, { useState } from 'react';
import { InputLabel, InputWrapperContainer } from '../../atoms/Inputs/InputWrapper.atom.styled';

type ControlledEditorInputProps = {
    title: string;
    editorState: EditorState;
    onEditorStateChange(editorState: EditorState | string): void;
}; import { Editor, EditorState } from "react-draft-wysiwyg";
import { RiHtml5Line, RiPencilFill } from 'react-icons/ri';
import { stateToHTML } from 'draft-js-export-html';

const ControlledEditorInput: React.FC<ControlledEditorInputProps> = ({
    title,
    editorState,
    onEditorStateChange
}) => {

    const [inputType, setInputType] = useState('editor')

    const changeEditorInput = (inputType: 'html' | 'editor') => {
        setInputType(inputType)
    }

    return (
        <InputWrapperContainer>
            <InputLabel>
                {title} - {
                    inputType == 'editor'
                    &&
                    <i style={{ cursor: "pointer", borderRadius: "5px" }} className="btn-success" onClick={(_) => changeEditorInput('html')}>Change to HTML Input <RiHtml5Line></RiHtml5Line></i>
                }{
                    inputType == 'html'
                    &&
                    <i style={{ cursor: "pointer", borderRadius: "5px" }} className="btn-success" onClick={(_) => changeEditorInput('editor')}>Change to Editor Input <RiPencilFill></RiPencilFill></i>
                }
            </InputLabel>
            <p>
            </p>
            {
                inputType == 'editor'
                &&
                <Editor
                    editorState={editorState}
                    editorStyle={{
                        border: "1px solid rgba(228, 228, 228)"
                    }}
                    onEditorStateChange={onEditorStateChange}
                />
            }
            {
                inputType == 'html'
                &&
                <textarea
                    value={stateToHTML(editorState.getCurrentContent())}
                    className="field__textarea"
                    onChange={(event) => onEditorStateChange(event.target.value)}
                />
            }
        </InputWrapperContainer>
    )
};

export default ControlledEditorInput;
