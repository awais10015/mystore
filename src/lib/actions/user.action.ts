"use server";

import User from "../modals/user.modal";
import { connect } from "@/lib/db";

interface UserInput {
  firstName: string  | boolean;
  lastName: string | boolean;
  email: string;
  username : string,
  password: string | boolean,
  photo: string,
  clerkId: string,
  
}

export async function createUser(user: UserInput) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
