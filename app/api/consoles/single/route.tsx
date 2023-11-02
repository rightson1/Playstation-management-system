import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Console from "@/utils/models/Console";

export async function GET(request: NextRequest) {
  await db();
  try {
    const id = request.nextUrl.searchParams.get("id") as string;
    const singleConsole = await Console.findById(id).populate("type");
    console.log(singleConsole);
    return NextResponse.json(singleConsole);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
