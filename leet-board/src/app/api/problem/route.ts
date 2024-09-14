import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/dbConnect";
import Problem from "@/lib/problems";

// Ensure database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const problem_id = body.problem_id;

    if (problem_id === undefined || problem_id === null) {
      return NextResponse.json({ error: "Problem ID is required" }, { status: 400 });
    }

    const parsedId = parseInt(problem_id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid Problem ID format" }, { status: 400 });
    }

    const problem = await Problem.findOne({ problem_id: parsedId });
    console.log(problem);
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json({ data: problem }, { status: 200 });
  } catch (error) {
    console.error("Error in problem API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}