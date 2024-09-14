import connect from "@/lib/dbConnect";
import User from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// @ts-ignore
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

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
        console.log(user);
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        // Set JWT as an HTTP-only cookie
        const serialized = serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 86400, // 1 hour
            path: '/'
        });
        // Create the response
        const response = NextResponse.json(
            { message: "Login successful",user : user },
            { status: 200 }
        );
        // Set the cookie
        response.headers.set('Set-Cookie', serialized);
        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}