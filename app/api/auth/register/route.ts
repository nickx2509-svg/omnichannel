import connectDB from "@/lib/db";
import Client from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return asyncHandler(async () => {
    await connectDB();

    const { name, email, password } = await req.json();

    // 1. Validation
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    if (password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters");
    }

    // 2. Check existence by Email only (Industry Standard)
    const existedUser = await Client.findOne({ email });
    if (existedUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    // 3. Create User (Hashed automatically by your model hook)
    const user = await Client.create({
      name,
      email,
      password,
    });

    // 4. Convert to object and REMOVE password before sending to frontend
    const createdUser = user.toObject();
    delete createdUser.password;

    return NextResponse.json(
      new ApiResponse(201, createdUser, "User registered successfully")
    );
  })();
}
