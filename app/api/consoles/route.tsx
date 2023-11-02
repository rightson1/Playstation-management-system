import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Console from "@/utils/models/Console";
import { ConsoleFetched } from "@/types";
import ConsoleType from "@/utils/models/ConsoleType";
import { models } from "mongoose";
export async function POST(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const model = await Console.create(body);
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
  try {
    await db();
    ConsoleType;
    const consoles = await Console.find({}).populate("type");
    return NextResponse.json(consoles);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//edit console
export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<ConsoleFetched> = await request.json();
    const updatedConsole = await Console.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedConsole), {
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
