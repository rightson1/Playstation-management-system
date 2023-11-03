import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Session from "@/utils/models/Session";
import { Types } from "mongoose";
import { SessionFetched } from "@/types";

export async function PUT(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    console.log(body);
    const updatedSession = await Session.findOneAndUpdate(
      {
        _id: body._id,
      },
      //addtoset player._id to players array
      {
        $addToSet: {
          players: body.player,
        },
      },
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
