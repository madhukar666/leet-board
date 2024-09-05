
import connect from "@/lib/dbConnect";
import User from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    const reqData = await request.json();
    const { email, password } = reqData;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }

        // Here you would typically generate a JWT or set a session cookie
        return NextResponse.json({ user: user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
