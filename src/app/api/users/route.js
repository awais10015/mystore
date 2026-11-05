import { NextResponse } from "next/server";
import User from "@/lib/modals/user.modal";
import { connect } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect();
    const users = await User.find().select("-password").lean();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
