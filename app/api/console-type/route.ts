import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import ConsoleType from "@/utils/models/ConsoleType";
import { ConsoleTypeFetched } from "@/types";
export async function POST(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const model = await ConsoleType.create(body);
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
    const consoleTypes = await ConsoleType.find({});
    return NextResponse.json(consoleTypes);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//edit consoleType
export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<ConsoleTypeFetched> = await request.json();
    const updatedConsoleType = await ConsoleType.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedConsoleType), {
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
