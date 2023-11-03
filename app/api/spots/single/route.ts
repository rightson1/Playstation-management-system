import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import spot from "@/utils/models/Spot";
import Console from "@/utils/models/Console";
import Game from "@/utils/models/Game";
export async function GET(request: NextRequest) {
  await db();
  try {
    const id = request.nextUrl.searchParams.get("id") as string;
    Console;
    const singlespot = await spot.findById(id).populate("console");
    const game = await Game.findOne({
      console: singlespot.console._id,
    });
    const spotWithGame = {
      ...singlespot.toJSON(),
      game: game.toJSON(),
    };
    return NextResponse.json(spotWithGame);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
