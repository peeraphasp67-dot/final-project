"use server";

import { cookies } from "next/headers";

// ตั้งค่า cookie หลังจาก login
export async function setUserCookie(userId: number) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "userId",
    value: String(userId),
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// อ่านค่า userId จาก cookie
export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");

  if (!userId) return null;
  return Number(userId.value);
}

// ลบ cookie ตอน logout
export async function clearUserCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
}
