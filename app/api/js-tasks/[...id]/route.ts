import { NextResponse } from "next/server";
import vm from "vm";

import prisma from "@/lib/db";

type Body = {
  solution: string;
  variant: "test" | "solution" | "quickTest";
  quickTest?: unknown[] | unknown[][];
  userId?: any;
  inputs?: [];
  expectedResult?: [];
  taskId?: any;
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

export const GET = async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);

    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.error();
    }
    const assignment: any = await prisma.javascriptAssignment.findUnique({
      where: {
        id: id,
      },
    });
    if (!assignment) {
      return NextResponse.error();
    }
    return NextResponse.json({ assignment });
  } catch (error) {
    console.error("Error retrieving assignment:", error);
    return NextResponse.error();
  }
};

export async function PUT(request: Request): Promise<Response> {
  let result: ResultType = { message: "" };
  const resultArr: ResultType[] = [];
  const body = (await request.json()) as Body;
  const {
    solution,
    variant,
    inputs = [],
    expectedResult = [],
    userId,
    taskId,
  } = body || {};

  if (variant === "quickTest") {
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
      runCode(solution);
      return NextResponse.json(resultArr);
    } catch (e) {
      const error = e as Error;
      const errorName = error?.name;
      const message = error?.message;
      resultArr.push({ errorName, message });
      return NextResponse.json(resultArr);
    }
  } else if (variant === "solution" || variant === "test") {
    const solutionLogsFullTests = inputs?.map((item: any) => {
      if (typeof item === "string" && item.startsWith("["))
        return `console.log(${solution}(${item}))`;
      else {
        return `console.log(${solution}("${item}"))`;
      }
    });
    const responseFullTests = await fetch("http://localhost:3000/api/RunCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: solutionLogsFullTests }),
    });

    const responseData = await responseFullTests.json();

    const updatedFullTestsResult = [];
    for (let i = 0; i < responseData.length; i++) {
      let codeOutcome = responseData[i];
      if (codeOutcome.errorName) {
        codeOutcome = codeOutcome;
      } else if (
        typeof codeOutcome.message === "string" &&
        codeOutcome.message.startsWith('["')
      ) {
        codeOutcome = codeOutcome.message.slice(2, -2);
      } else if (
        typeof codeOutcome.message === "string" &&
        codeOutcome.message.startsWith("[")
      ) {
        codeOutcome = codeOutcome.message.slice(1, -1);
      }
      const passed = codeOutcome === expectedResult[i];
      if (variant === "solution") {
        const javascriptAssignmentSolution =
          await prisma.javascriptAssignmentSolution.findUnique({
            where: {
              javascriptAssignmentId_userId: {
                javascriptAssignmentId: taskId,
                userId: userId,
              },
            },
          });

        if (!javascriptAssignmentSolution) {
          await prisma.javascriptAssignmentSolution.create({
            data: {
              javascriptAssignment: {
                connect: { id: taskId },
              },
              solution: [body.solution],
              isCompleted: passed,
              user: {
                connect: { id: body.userId },
              },
            },
          });
        } else {
          if (
            (!javascriptAssignmentSolution.isCompleted && !passed) ||
            (javascriptAssignmentSolution.isCompleted && passed) ||
            (!javascriptAssignmentSolution.isCompleted && passed)
          ) {
            await prisma.javascriptAssignmentSolution.update({
              where: { id: javascriptAssignmentSolution?.id },
              data: {
                solution: [solution],
                isCompleted: passed,
              },
            });
          }
        }
      }

      const result = {
        input: inputs[i],
        expectedResult: expectedResult[i],
        codeOutcome: codeOutcome,
        testOutcome: passed,
      };

      updatedFullTestsResult.push(result);
    }

    if (variant === "solution") {
      const existingTask = await prisma.javascriptAssignment.findUnique({
        where: { id: taskId },
      });

      if (!existingTask) {
        return NextResponse.json(
          {
            message: "Task with this ID does not exist",
          },
          { status: 404 }
        );
      }

      await prisma.javascriptAssignment.update({
        where: { id: taskId },
        data: {
          submissions: { increment: 1 },
        },
      });
    }

    const response =
      variant === "test"
        ? updatedFullTestsResult.slice(0, 3)
        : updatedFullTestsResult;

    return NextResponse.json(response);
  }

  return NextResponse.json({ error: "Invalid variant" });
}
