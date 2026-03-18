import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("NOVÁ OBJEDNÁVKA:");
    console.log(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("CHYBA API /api/order:", error);
    return NextResponse.json(
      { ok: false, error: "Nepodařilo se zpracovat objednávku." },
      { status: 500 }
    );
  }
}