import { useTranslations } from "next-intl";

import MonacoEditor from "../MonacoEditor";

type TestCaseProps = {
  tests?: any;
};

const TestCase: React.FC<TestCaseProps> = ({ tests }) => {
  const t = useTranslations("task");

  const inputs = tests?.slice(0, 3).map((test: any) => {
    return { input: [test.input], output: test.output };
  });

  return (
    <>
      {inputs?.map((e: any, index: number) => (
        <div key={index}>
          <p className="text-3/4.5 font-medium mt-5">
            {t("testCaseNumber", { number: index + 1 })}
          </p>
          <div className="border border-grey rounded-md shadow-sampleWindowShadow">
            <MonacoEditor
              quickSuggestions={false}
              variant="testValue"
              editorValue={JSON.stringify(e, null, 2)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default TestCase;
