// src/app/api/cena-form/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Získání dat
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const brand = String(formData.get("brand") || "").trim();
    const desc = String(formData.get("desc") || "").trim();
    const sn = String(formData.get("sn") || "").trim();
    const pn = String(formData.get("pn") || "").trim();
    const problemKey = String(formData.get("problemKey") || "");
    const problemLabel = String(formData.get("problemLabel") || "");

    // === VALIDACE ===
    if (!name || !email || !phone || !brand || !desc || !sn) {
      return NextResponse.json(
        { ok: false, error: "Vyplňte prosím všechny povinné údaje." },
        { status: 400 }
      );
    }

    const attachment = formData.get("attachment") as File | null;

    // Interní email pro tebe (servis)
    await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `💰 Nová poptávka ceny – ${name}`,
      html: `
        <h2>Nová poptávka orientační ceny</h2>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Značka / model:</strong> ${brand}</p>
        <p><strong>Problém:</strong> ${problemLabel} (${problemKey})</p>
        <p><strong>Popis:</strong></p>
        <p>${desc}</p>
        <p><strong>SN:</strong> ${sn}</p>
        <p><strong>PN / Model:</strong> ${pn || "—"}</p>
        ${attachment ? `<p><strong>Příloha:</strong> Ano (${attachment.name})</p>` : ""}
        <hr />
        <p><em>Zákazník čeká na cenovou nabídku.</em></p>
      `,
    });

    // Potvrzovací email pro zákazníka
    await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: email,
      subject: "✅ Přijali jsme vaši poptávku ceny – HV Notebooky",
      html: `
        <h2>Děkujeme, ${name}!</h2>
        <p>Vaše poptávka orientační ceny byla úspěšně přijata.</p>
        
        <p><strong>Co teď?</strong></p>
        <ul>
          <li>Ozveme se vám s cenovou nabídkou obvykle do 24 hodin.</li>
          <li>Pokud budeme potřebovat doplnit informace, kontaktujeme vás.</li>
        </ul>

        <p><strong>Shrnutí vaší poptávky:</strong></p>
        <p><strong>Značka:</strong> ${brand}<br />
           <strong>Problém:</strong> ${problemLabel}</p>

        <hr />
        <p>
          S pozdravem<br />
          <strong>HV Notebooky</strong><br />
          <a href="tel:+420774506503">774 506 503</a>
        </p>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("API /api/cena-form error:", error);
    return NextResponse.json(
      { ok: false, error: "Nepodařilo se odeslat poptávku. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}