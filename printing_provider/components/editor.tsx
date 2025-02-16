import React from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

const Editor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: any) => void;
}) => {
  return (
    <FroalaEditor
      model={value}
      onModelChange={onChange}
      config={{
        placeholderText: "Edit Your Content Here!",
        toolbarButtons: [
          'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
          'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
          'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote',
          'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable',
          'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting',
          'print', 'help', 'html',
          'undo', 'redo',
          'h1', 'h2', 'h3', 'h4', 'h5', 'highlight', 'code'
        ],
        pluginsEnabled: [
          'align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons',
          'entities', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle',
          'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert',
          'quote', 'save', 'table', 'url', 'video', 'wordPaste'
        ]
      }}
    />
  );
};

export default Editor;
