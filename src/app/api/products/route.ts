import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ แก้ path ให้ถูกต้อง

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load products", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, price, image, category } = await req.json();
    if (!name || !price) {
      return NextResponse.json({ error: "Missing name or price" }, { status: 400 });
    }
    const product = await prisma.product.create({
      data: { name, price: Number(price), image, category },
    });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create product", detail: String(err) },
      { status: 500 }
    );
  }
}
