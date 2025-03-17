// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ projects });
}

// Mock data for now—imagine this came from a DB
// const projects = [
//   {
//     id: "1",
//     title: "Philosophy-Themed Portfolio",
//     description: "A minimal personal site",
//   },
//   {
//     id: "2",
//     title: "CLI Tool for Builders",
//     description: "A command-line tool for scaffolding projects",
//   },
//   {
//     id: "3",
//     title: "Next.js Blog",
//     description: "Exploring SSR, SSG, and dynamic routing",
//   },
// ];

// export async function GET() {
//   return NextResponse.json({ projects });
// }
