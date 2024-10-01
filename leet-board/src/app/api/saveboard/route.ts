import User from "@/lib/users";
import connect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";

// Ensure the database is connected
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    const { problemid, email, board, problem_title } = data;

    // Fetch the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract the user's boards
    const boards: Array<any> = user.boards;

    // Find the index of the board with the matching problem ID
    let boardIndex = boards.findIndex((b) => b.problem_id === problemid);

    // If no board is found, add a new one; otherwise, update the existing board
    if (boardIndex === -1) {
      boards.push({
        problem_id: problemid,
        problem_title: problem_title,
        version: board,
      });
      boardIndex = boards.length - 1; // Adjust index to new length
    } else {
      boards[boardIndex].version = board;
    }

    // Update the user with the modified boards
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { boards } }, // Use $set to update only the boards field
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      return NextResponse.json(
        {
          message: "Auto-save completed",
          currentVersion: updatedUser.boards[boardIndex],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
