import React, { createContext, useContext, useState, ReactNode } from "react";

type EditorAndQuickTestContextType = {
  solution: string;
  setSolution: React.Dispatch<React.SetStateAction<string>>;
  quickTest: string;
  setQuickTest: React.Dispatch<React.SetStateAction<string>>;
};

const EditorAndQuickTestContext = createContext<
  EditorAndQuickTestContextType | undefined
>(undefined);

type EditorAndQuickTestProviderProps = {
  children: ReactNode;
};

export const EditorAndQuickTestProvider: React.FC<
  EditorAndQuickTestProviderProps
> = ({ children }) => {
  const [solution, setSolution] = useState("");
  const [quickTest, setQuickTest] = useState("");

  const value: EditorAndQuickTestContextType = {
    solution,
    setSolution,
    quickTest,
    setQuickTest,
  };

  return (
    <EditorAndQuickTestContext.Provider value={value}>
      {children}
    </EditorAndQuickTestContext.Provider>
  );
};

export const useEditorAndQuickTestContext =
  (): EditorAndQuickTestContextType => {
    const context = useContext(EditorAndQuickTestContext);

    if (!context) {
      throw new Error(
        "useEditorAndQuickTestContext must be used within a EditorAndQuickTestProvider"
      );
    }

    return context;
  };
