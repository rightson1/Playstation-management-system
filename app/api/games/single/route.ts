import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Game from "@/utils/models/Game";

export async function GET(request: NextRequest) {
  await db();
  try {
    const id = request.nextUrl.searchParams.get("id") as string;
    const singleGame = await Game.findById(id).populate("consoleType");
    return NextResponse.json(singleGame);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
