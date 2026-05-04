// src/app/api/cena-form/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const brand = String(formData.get("brand") || "").trim();
    const desc = String(formData.get("desc") || "").trim();
    const sn = String(formData.get("sn") || "").trim();
    const pn = String(formData.get("pn") || "").trim();
    const problemLabel = String(formData.get("problemLabel") || "");

    if (!name || !email || !phone || !brand || !desc || !sn) {
      return NextResponse.json({ ok: false, error: "Chybí povinné údaje." }, { status: 400 });
    }

    // Interní email
    const internalResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `💰 Poptávka ceny – ${name}`,
      html: `
        <h2>Nová poptávka orientační ceny</h2>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Značka:</strong> ${brand}</p>
        <p><strong>Problém:</strong> ${problemLabel}</p>
        <p><strong>Popis:</strong> ${desc}</p>
        <p><strong>SN:</strong> ${sn}</p>
        <p><strong>PN:</strong> ${pn || "-"}</p>
      `,
    });

    if (internalResult.error) {
      console.error("Resend internal error:", internalResult.error);
      return NextResponse.json({ ok: false, error: "Chyba při odesílání interního mailu." }, { status: 500 });
    }

    // Potvrzovací email zákazníkovi
    const customerResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: email,
      subject: "✅ Přijali jsme vaši poptávku ceny",
      html: `
        <h2>Děkujeme, ${name}!</h2>
        <p>Vaše poptávka byla přijata. Ozveme se vám s cenou do 24 hodin.</p>
        <p><strong>Problém:</strong> ${problemLabel}</p>
        <hr />
        <p>S pozdravem<br /><strong>HV Notebooky</strong></p>
      `,
    });

    if (customerResult.error) {
      console.error("Resend customer error:", customerResult.error);
      return NextResponse.json({ ok: false, error: "Chyba při odesílání potvrzovacího mailu." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ ok: false, error: "Nepodařilo se zpracovat požadavek." }, { status: 500 });
  }
}