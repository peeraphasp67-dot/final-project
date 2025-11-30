import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // ลบ cookie แบบถูกต้องใน Next.js 15
  res.cookies.set("session-token", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
