"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type EditorContextType = {
  editorCode: string;
  setEditorCode: React.Dispatch<React.SetStateAction<string>>;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

type EditorProviderProps = {
  children: ReactNode;
};

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [editorCode, setEditorCode] = useState("");

  const value: EditorContextType = {
    editorCode,
    setEditorCode,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

export const useEditorContext = (): EditorContextType => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }

  return context;
};
