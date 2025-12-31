import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";

export const asyncHandler =
  (fn: Function) => async (req?: Request, context?: any) => {
    try {
      return await fn(req, context);
    } catch (error: any) {
      // Known API error
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            statusCode: error.statusCode,
            message: error.message,
          },
          { status: error.statusCode }
        );
      }

      // Unknown error
      return NextResponse.json(
        {
          success: false,
          statusCode: 500,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  };
