import BraftEditor from "braft-editor";
import { useState, useRef } from "react";
import "braft-editor/dist/index.css";

const FoEditor = ({
  className,
  style,
  placeholder,
  defaultState,
  onChange,
  onSave,
  onCancel,
}) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(defaultState)
  );
  const [outputHTML, setOutputHTML] = useState(defaultState);
  const [disabled, setDisabled] = useState(outputHTML);
  const handleChange = (state) => {
    setEditorState(state);
    onChange?.(state.toHTML());
    if (onSave || onCancel) {
      setDisabled(editorState.isEmpty());
      setOutputHTML(state.toHTML());
    }
  };
  return (
    <BraftEditor
      ref={editorRef}
      className={className}
      style={style}
      placeholder={placeholder}
      value={editorState}
      onChange={handleChange}
    />
  );
};

export default FoEditor;
