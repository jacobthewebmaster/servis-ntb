import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      desc: formData.get("desc"),
      sn: formData.get("sn"),
      pn: formData.get("pn"),
      problemKey: formData.get("problemKey"),
      problemLabel: formData.get("problemLabel"),
      attachment: formData.get("attachment"),
    };

    console.log("NOVA POPTAVKA CENY:");
    console.log(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("API /api/cena-form error:", error);

    return NextResponse.json(
      { ok: false, error: "Nepodařilo se zpracovat formulář." },
      { status: 500 }
    );
  }
}