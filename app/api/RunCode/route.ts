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

export async function POST(request: Request): Promise<Response> {
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

    const response = NextResponse.json(resultArr);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (e) {
    const error = e as Error;
    const errorName = error?.name;
    const message = error?.message;
    resultArr.push({ errorName, message });

    const errorResponse = NextResponse.json(resultArr);
    errorResponse.headers.set("Access-Control-Allow-Origin", "*");
    errorResponse.headers.set(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS"
    );
    errorResponse.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return errorResponse;
  }
}

export async function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
