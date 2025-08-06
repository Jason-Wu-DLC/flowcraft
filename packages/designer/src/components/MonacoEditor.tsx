import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import styles from './MonacoEditor.module.scss';

interface MonacoEditorProps {
  value: string;
  language?: string;
  theme?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onSave?: () => void;
  height?: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language = 'javascript',
  theme = 'vs-dark',
  readOnly = false,
  onChange,
  onSave,
  height = '400px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // 创建Monaco Editor实例
    const editor = monaco.editor.create(editorRef.current, {
      value,
      language,
      theme,
      readOnly,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      lineNumbers: 'on',
      roundedSelection: false,
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
      },
      overviewRulerBorder: false,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
    });

    // 监听内容变化
    if (onChange) {
      editor.onDidChangeModelContent(() => {
        const currentValue = editor.getValue();
        onChange(currentValue);
      });
    }

    // 监听保存快捷键
    if (onSave) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        onSave();
      });
    }

    editorInstanceRef.current = editor;

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
      }
    };
  }, [language, theme, readOnly, onChange, onSave]);

  // 更新编辑器内容
  useEffect(() => {
    if (editorInstanceRef.current) {
      const currentValue = editorInstanceRef.current.getValue();
      if (currentValue !== value) {
        editorInstanceRef.current.setValue(value);
      }
    }
  }, [value]);

  return (
    <div className={styles.monacoEditor} style={{ height }}>
      <div ref={editorRef} className={styles.editorContainer} />
    </div>
  );
};

export default MonacoEditor; 