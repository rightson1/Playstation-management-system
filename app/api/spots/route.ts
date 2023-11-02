import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Spot from "@/utils/models/Spot";
import { SpotFetched } from "@/types";
export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const model = await Spot.create(body);
    console.log({ body, model });
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
    const spots = await Spot.find({});
    return NextResponse.json(spots);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//edit spot
export async function PUT(request: NextRequest) {
  await db();
  try {
    const body: Partial<SpotFetched> = await request.json();
    const updatedSpot = await Spot.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedSpot), {
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
