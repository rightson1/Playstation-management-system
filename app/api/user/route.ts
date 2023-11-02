import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import User from "@/utils/models/User";
import { UserFetched } from "@/types";
export async function POST(request: NextRequest) {
  await db();
  const body = await request.json();
  const user = await User.find({
    uid: body.uid,
  }).countDocuments();
  if (user === 0) {
    const user = await User.create(body);
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: "User already exists" });
  }
}

export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<UserFetched> = await request.json();
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedUser), {
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
