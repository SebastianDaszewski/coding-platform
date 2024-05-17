import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

import { Category } from "@prisma/client";
import { DifficultyLevel } from "@prisma/client";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");
  try {
    const assignments = await prisma.javascriptAssignment.findMany({
      select: {
        id: true,
        category: true,
        difficultyLevel: true,
        name: true,
        solutions: true,
      },
      take: Number(limit),
    });
    const users = await prisma.user.findMany();
    const solutions = await prisma.javascriptAssignmentSolution.findMany();
    return NextResponse.json({ assignments, users, solutions });
  } catch (error) {
    console.error("Error retrieving assignments:", error);
    return NextResponse.error();
  }
};

const dataAssignments = [
  {
    name: "Reverse string",
    descriptionStart: "Napisz funkcję, która odwraca ciąg znaków.",
    descriptionEnd: "Nie używaj wbudowanej funkcji reverse().",
    patternFunction:
      "function reverseString(input) {return input.split('').reverse().join('');}",
    sampleInput: ["hello"],
    sampleOutput: ["olleh"],
    category: Category.LOOP,
    difficultyLevel: DifficultyLevel.EASY,
    tests: [
      { input: ["world"], output: "dlrow" },
      { input: ["openai"], output: "ianepo" },
      { input: ["assistant"], output: "tnatsissa" },
      { input: ["example"], output: "elpmaxe" },
      { input: ["function"], output: "noitcnuf" },
      { input: ["input"], output: "tupni" },
      { input: ["output"], output: "tuptuo" },
      { input: ["apple"], output: "elppa" },
      { input: ["banana"], output: "ananab" },
      { input: ["racecar"], output: "racecar" },
    ],
  },
  {
    name: "Doubling Each Element",
    descriptionStart: "Podwój wartość każdego elementu w istniejącej tablicy.",
    descriptionEnd:
      "Zmodyfikuj tablicę tak, aby każdy jej element został podwojony.",
    patternFunction:
      "function doubleEachElement(input) { return input.map(element => element * 2); }",
    sampleInput: ["[1,2,3]"],
    sampleOutput: ["[2,4,6]"],
    category: Category.FUNCTION,
    difficultyLevel: DifficultyLevel.MEDIUM,
    tests: [
      { input: ["[1,2,3]"], output: ["[2,4,6]"] },
      { input: ["[2,3,4]"], output: ["[4,6,8]"] },
      { input: ["[5,6,7]"], output: ["[10,12,14]"] },
      { input: ["[3,8,9]"], output: ["[6,16,18]"] },
      { input: ["[4,5,4]"], output: ["[8,10,8]"] },
      { input: ["[3,3,3]"], output: ["[6,6,6]"] },
      { input: ["[7,7,5]"], output: ["[14,14,10]"] },
      { input: ["[2,11,2]"], output: ["[4,22,4]"] },
      { input: ["[7,7,2]"], output: ["[14,14,4]"] },
      { input: ["[2,11,2]"], output: ["[4,22,4]"] },
    ],
  },

  {
    name: "Cut string",
    descriptionStart: "Wytnij trzy pierwsze litery.",
    descriptionEnd: "",
    patternFunction:
      "function substringString(input) {return input.substring(3);}",
    sampleInput: ["hello"],
    sampleOutput: ["lo"],
    category: Category.FUNCTION,
    difficultyLevel: DifficultyLevel.HARD,
    tests: [
      { input: ["world"], output: "ld" },
      { input: ["openai"], output: "nai" },
      { input: ["assistant"], output: "istant" },
      { input: ["example"], output: "mple" },
      { input: ["function"], output: "ction" },
      { input: ["input"], output: "ut" },
      { input: ["output"], output: "put" },
    ],
  },
  {
    name: "Double the number",
    descriptionStart: "Zwiększ przykładowy numer dwukrotnie.",
    descriptionEnd: "",
    patternFunction: "function doubleFunction(a) { return a * 2; }",
    sampleInput: ["5"],
    sampleOutput: ["10"],
    category: Category.LOOP,
    difficultyLevel: DifficultyLevel.EASY,
    tests: [
      { input: ["5"], output: ["10"] },
      { input: ["20"], output: ["40"] },
      { input: ["128"], output: ["256"] },
      { input: ["256"], output: ["512"] },
      { input: ["512"], output: ["1024"] },
      { input: ["6"], output: ["12"] },
      { input: ["9"], output: ["18"] },
      { input: ["7"], output: ["14"] },
      { input: ["12"], output: ["24"] },
      { input: ["15"], output: ["30"] },
    ],
  },
  {
    name: "Halve a number",
    descriptionStart: "Podziel przykładowy numer przez dwa.",
    descriptionEnd: "",
    patternFunction: "function halveFunction(a) { return a / 2; }",
    sampleInput: ["10"],
    sampleOutput: ["5"],
    category: Category.FUNCTION,
    difficultyLevel: DifficultyLevel.HARD,
    tests: [
      { input: ["10"], output: ["5"] },
      { input: ["20"], output: ["10"] },
      { input: ["128"], output: ["64"] },
      { input: ["256"], output: ["128"] },
      { input: ["512"], output: ["256"] },
      { input: ["6"], output: ["3"] },
      { input: ["9"], output: ["4.5"] },
      { input: ["7"], output: ["3.5"] },
      { input: ["12"], output: ["6"] },
      { input: ["15"], output: ["7.5"] },
    ],
  },
  {
    name: "Check for vowels",
    descriptionStart: "Napisz funkcję, która sprawdza,",
    descriptionEnd: "czy dany string zawiera samogłoski (a, e, i, o, u).",
    patternFunction:
      "function hasVowels(input) {const vowels = ['a', 'e', 'i', 'o', 'u']; return input.split('').some(char => vowels.includes(char.toLowerCase()));}",
    sampleInput: ["hello"],
    sampleOutput: ["true"],
    category: Category.LOOP,
    difficultyLevel: DifficultyLevel.MEDIUM,
    tests: [
      { input: ["world"], output: "true" },
      { input: ["sky"], output: "false" },
      { input: ["crypt"], output: "false" },
      { input: ["rhythm"], output: "false" },
      { input: ["hello"], output: "true" },
      { input: ["fly"], output: "false" },
      { input: ["bye"], output: "true" },
      { input: ["opel"], output: "true" },
      { input: ["dry"], output: "false" },
      { input: ["fry"], output: "false" },
    ],
  },
  {
    name: "Incrementing Last Element",
    descriptionStart:
      "Zwiększ wartość ostatniego elementu w istniejącej tablicy o 1.",
    descriptionEnd:
      "Zmodyfikuj tablicę tak, aby ostatni element zwiększył się o 1.",
    patternFunction:
      "function incrementLastElement(input) { input[input.length - 1] += 1; return input; }",
    sampleInput: ["[1,2,3]"],
    sampleOutput: ["[1,2,4]"],
    category: Category.FUNCTION,
    difficultyLevel: DifficultyLevel.EASY,
    tests: [
      { input: ["[1,2,3]"], output: ["[1,2,4]"] },
      { input: ["[2,3,4]"], output: ["[2,3,5]"] },
      { input: ["[5,6,7]"], output: ["[5,6,8]"] },
      { input: ["[3,8,9]"], output: ["[3,8,10]"] },
      { input: ["[4,5,4]"], output: ["[4,5,5]"] },
      { input: ["[3,3,3]"], output: ["[3,3,4]"] },
      { input: ["[7,7,5]"], output: ["[7,7,6]"] },
      { input: ["[2,11,2]"], output: ["[2,11,3]"] },
      { input: ["[7,7,2]"], output: ["[7,7,3]"] },
      { input: ["[2,11,2]"], output: ["[2,11,3]"] },
    ],
  },
  {
    name: "Check for alphanumeric characters",
    descriptionStart: "Napisz funkcję, która sprawdza,",
    descriptionEnd: "czy dany string zawiera tylko litery lub cyfry.",
    patternFunction:
      "function hasAlphanumeric(input) {return /^[a-zA-Z0-9]+$/.test(input);}",
    sampleInput: ["hello123"],
    sampleOutput: ["true"],
    category: Category.FUNCTION,
    difficultyLevel: DifficultyLevel.EASY,
    tests: [
      { input: ["hello123"], output: "true" },
      { input: ["!@#$"], output: "false" },
      { input: ["123"], output: "true" },
      { input: ["abc"], output: "true" },
      { input: ["abc123"], output: "true" },
      { input: ["ABC"], output: "true" },
      { input: [""], output: "false" },
      { input: ["123456"], output: "true" },
      { input: ["!@#$%^&"], output: "false" },
      { input: ["abcABC123"], output: "true" },
    ],
  },
  {
    name: "Square the number",
    descriptionStart: "Podnieś przykładową liczbę do kwadratu.",
    descriptionEnd: "",
    patternFunction: "function squareFunction(a) { return a * a; }",
    sampleInput: ["5"],
    sampleOutput: ["25"],
    category: Category.LOOP,
    tests: [
      { input: ["5"], output: ["25"] },
      { input: ["20"], output: ["400"] },
      { input: ["128"], output: ["16384"] },
      { input: ["256"], output: ["65536"] },
      { input: ["512"], output: ["262144"] },
      { input: ["6"], output: ["36"] },
      { input: ["9"], output: ["81"] },
      { input: ["7"], output: ["49"] },
      { input: ["12"], output: ["144"] },
      { input: ["15"], output: ["225"] },
    ],
  },
  {
    name: "Adding to array",
    descriptionStart: "Dodaj wartość do istniejącej tablicy.",
    descriptionEnd: "Dadana wartość ma znaleźć się na końcu tablicy.",
    patternFunction:
      "function addingToArray(input) {input.push(1); return input;}",
    sampleInput: ["[1,2,3]"],
    sampleOutput: ["[1,2,3,1]"],
    category: Category.FUNCTION,
    difficultyLevel: DifficultyLevel.MEDIUM,
    tests: [
      { input: ["[1,2,3]"], output: ["[1,2,3,1]"] },
      { input: ["[2,3,4]"], output: ["[2,3,4,1]"] },
      { input: ["[5,6,7]"], output: ["[5,6,7,1]"] },
      { input: ["[3,8,9]"], output: ["[3,8,9,1]"] },
      { input: ["[4,5,4]"], output: ["[4,5,4,1]"] },
      { input: ["[3,3,3]"], output: ["[3,3,3,1]"] },
      { input: ["[7,7,5]"], output: ["[7,7,5,1]"] },
      { input: ["[2,11,2]"], output: ["[2,11,2,1]"] },
      { input: ["[7,7,2]"], output: ["[7,7,2,1]"] },
      { input: ["[2,11,2]"], output: ["[2,11,2,1]"] },
    ],
  },
];

async function main() {
  try {
    const assignmentsCount = await prisma.javascriptAssignment.count();

    if (assignmentsCount === 0) {
      await prisma.javascriptAssignment.createMany({
        data: dataAssignments,
      });

      console.log("Added 10 sample tasks to the javascriptAssignment table.");
    } else {
      console.log(
        "The javascriptAssignment table is not empty. No sample tasks added."
      );
    }
  } catch (error) {
    console.error("An error occured:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
