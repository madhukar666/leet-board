import { NextRequest, NextResponse } from 'next/server';
import connect from "@/lib/dbConnect";
import User from "@/lib/users";
import bcryptjs from "bcryptjs";
//@ts-ignore
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

connect();

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      username: "*" // You might want to generate a unique username here
    });
    const savedUser = await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Set JWT as an HTTP-only cookie
    const serialized = serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600 * 24, // 1 day
      path: '/'
    });

    // Create the response
    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName
      }
    }, { status: 200 });

    // Set the cookie
    response.headers.set('Set-Cookie', serialized);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}