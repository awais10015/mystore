import { NextResponse } from "next/server";
import User from "@/lib/modals/user.modal";

import {connect} from "@/lib/db";

export async function GET() {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
