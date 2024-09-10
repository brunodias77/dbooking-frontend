"use server";
import { cookies } from "next/headers";

export async function getUserDetails() {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get("userEmail");
  return { data: { email: cookieValue } };
}
