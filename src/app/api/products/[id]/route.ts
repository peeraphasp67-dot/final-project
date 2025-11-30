import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, price, image, category } = await req.json();
    const product = await prisma.product.update({
      where: { id: Number(params.id) },
      data: { name, price, image, category },
    });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update product", detail: String(err) },
      { status: 500 }
    );
  }
}
