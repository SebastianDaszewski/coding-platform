import { NextResponse } from "next/server";
import vm from "vm";
type Body = {
  code: string;
};
type ResultType = {
  message: string;
  errorName?: string;
};
const runCode = (code: string) => {
  const sandbox = {
    console: {
      log: (...args: any[]) => console.log(JSON.stringify(args)),
      error: (...args: any[]) => console.error(JSON.stringify(args)),
      warn: (...args: any[]) => console.warn(JSON.stringify(args)),
    },
  };
  const timeout = 5000;
  const context = vm.createContext(sandbox);
  vm.runInContext(code, context, { timeout });
  return sandbox;
};
export async function POST(request: Request): Promise<void | Response> {
  let result: ResultType = { message: "" };
  const resultArr: ResultType[] = [];
  const body = (await request.json()) as Body;
  const { code } = body || "";
  try {
    console.log = (message: string) => {
      result = { message };
      resultArr.push(result);
    };
    console.error = (message: string) => {
      result = { message };
      resultArr.push(result);
    };
    console.warn = (message: string) => {
      result = { message };
      resultArr.push(result);
    };
    runCode(code);
    return NextResponse.json(resultArr);
  } catch (e) {
    const error = e as Error;
    const errorName = error?.name;
    const message = error?.message;
    resultArr.push({ errorName, message });
    return NextResponse.json(resultArr);
  }
}
