import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Game from "@/utils/models/Game";
import ConsoleType from "@/utils/models/ConsoleType";
import { GameFetched } from "@/types";
export async function POST(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const model = await Game.create(body);
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
    const games = await Game.find({}).populate("consoleType");
    return NextResponse.json(games);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//edit game
export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<GameFetched> = await request.json();
    const updatedGame = await Game.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedGame), {
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
