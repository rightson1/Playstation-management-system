import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Session from "@/utils/models/Session";
import { Types } from "mongoose";

export async function GET(request: NextRequest) {
  await db();

  try {
    const earningsByConsole = await Session.find({
      status: "completed",
    }).sort({ createdAt: -1 });

    return new NextResponse(JSON.stringify(earningsByConsole), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
