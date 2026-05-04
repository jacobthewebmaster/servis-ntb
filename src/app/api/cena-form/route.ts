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

    // === VALIDACE ===
    if (!name || !email || !phone || !brand || !desc || !sn) {
      return NextResponse.json(
        { ok: false, error: "Vyplňte prosím všechny povinné údaje." },
        { status: 400 }
      );
    }

    // ==================== INTERNÍ EMAIL (pro tebe) ====================
    await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `💰 Poptávka ceny – ${name}`,
      html: `
        <h2>Nová poptávka orientační ceny</h2>
        <hr />
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Značka:</strong> ${brand}</p>
        <p><strong>Problém:</strong> ${problemLabel}</p>
        <p><strong>Popis vady:</strong> ${desc}</p>
        <p><strong>SN:</strong> ${sn}</p>
        <p><strong>PN / Model:</strong> ${pn || "-"}</p>
        <hr />
        <p><em>Zákazník očekává cenovou nabídku.</em></p>
      `,
    });

    // ==================== EMAIL ZÁKAZNÍKOVI ====================
    await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: email,
      subject: "✅ Přijali jsme vaši poptávku ceny",
      html: `
        <h2>Děkujeme, ${name}!</h2>
        <p>Vaše poptávka orientační ceny byla úspěšně přijata.</p>
        
        <p>Ozveme se vám s cenovou nabídkou obvykle do 24 hodin.</p>
        
        <p><strong>Shrnutí vaší poptávky:</strong></p>
        <p><strong>Značka:</strong> ${brand}<br />
           <strong>Problém:</strong> ${problemLabel}</p>

        <p>Pokud budeme potřebovat doplnit informace, ozveme se vám na tento email nebo telefon.</p>

        <hr />
        <p>
          S pozdravem<br />
          <strong>HVservis</strong><br />
          📞 <a href="tel:+420774506503">774 506 503</a>
        </p>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("CENA-FORM API ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Nepodařilo se zpracovat poptávku." },
      { status: 500 }
    );
  }
}