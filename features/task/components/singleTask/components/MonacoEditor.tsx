import React, { FC, useRef } from "react";

import { Editor, EditorProps, loader } from "@monaco-editor/react";
import { darkGrey, grey, extraLightGrey, white } from "@/styles/colors";

type MonacoEditorProps = EditorProps & {
  variant?: "testEditor" | "testValue";
  editorValue?: string;
  onChange?: (value: string) => void;
  height?: any;
  width?: any;
  quickSuggestions: any;
};

const MonacoEditor: FC<MonacoEditorProps> = ({
  editorValue,
  variant = "editor",
  quickSuggestions,
  width,
  onChange,
}) => {
  const editorRef = useRef<any>(null);
  const isTestValue = variant === "testValue";
  const lineCount =
    typeof editorValue === "string"
      ? (editorValue.match(/\n/g) || []).length + 1
      : 0;

  React.useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": darkGrey,
          "editorLineNumber.foreground": extraLightGrey,
          "editorLineNumber.activeForeground": white,
          "editorGutter.background": grey,
          "scrollbarSlider.background": white,
          "scrollbarSlider.hoverBackground": white,
          "scrollbarSlider.activeBackground": white,
        },
      });
    });
  }, []);

  const additionOnMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const editorHeight = () => {
    let height;
    switch (variant) {
      case "editor":
        height = "100%";
        break;
      case "testEditor":
        height = "100px";
        break;
      case "testValue":
        height = lineCount * 19 + 6;
        break;
    }
    return height;
  };

  return (
    <Editor
      theme="dark"
      width={width}
      height={editorHeight()}
      onChange={onChange}
      className="editor-container"
      defaultLanguage="javascript"
      value={editorValue}
      options={{
        readOnly: isTestValue,
        quickSuggestions: quickSuggestions,
        minimap: { enabled: false },
        hideCursorInOverviewRuler: true,
        scrollbar: {
          vertical: "visible",
          horizontalHasArrows: false,
          verticalHasArrows: false,
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        automaticLayout: true,
      }}
      onMount={(editor, monaco) => {
        additionOnMount?.(editor, monaco);
        monaco.editor.remeasureFonts();
      }}
    />
  );
};

export default MonacoEditor;
