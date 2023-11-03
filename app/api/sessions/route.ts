import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Session from "@/utils/models/Session";
import { Types } from "mongoose";
import { SessionFetched } from "@/types";
import User from "@/utils/models/User";
export async function POST(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const model = await Session.create(body);
    return new NextResponse(JSON.stringify(model), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  await db();
  try {
    const id = request.nextUrl.searchParams.get("id") as string;
    const code = request.nextUrl.searchParams.get("code") as string;
    User;
    const session = id
      ? await Session.findOne({
          spot: new Types.ObjectId(id),
          status: "current",
        }).populate("players")
      : await Session.findOne({
          code: code,
          status: "current",
        });
    return NextResponse.json(session);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//edit session
export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<SessionFetched> = await request.json();
    const updatedSession = await Session.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedSession), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
