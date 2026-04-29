import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const desc = String(formData.get("desc") || "");
    const sn = String(formData.get("sn") || "");
    const pn = String(formData.get("pn") || "");
    const problemKey = String(formData.get("problemKey") || "");
    const problemLabel = String(formData.get("problemLabel") || "");

    // 1) INTERNÍ MAIL TOBĚ
    const internalResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `💰 Poptávka ceny – ${name}`,
      html: `
        <h2 style="margin-bottom:20px;">Nová poptávka orientační ceny</h2>
        <hr style="margin:20px 0;" />

        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Problém:</strong> ${problemLabel} (${problemKey})</p>
        <p><strong>Popis vady:</strong> ${desc}</p>
        <p><strong>SN:</strong> ${sn}</p>
        <p><strong>PN / Model:</strong> ${pn}</p>

        <hr style="margin:20px 0;" />

        <h3>📩 Co dál?</h3>
        <p>
          Zákazník očekává orientační cenovou nabídku – doporučeno odpovědět co nejdříve.
        </p>
      `,
    });

    if ((internalResult as any)?.error) {
      return NextResponse.json(
        { ok: false, error: (internalResult as any).error.message || "Chyba Resend." },
        { status: 500 }
      );
    }

    // 2) AUTO ODPOVĚĎ ZÁKAZNÍKOVI
    const customerResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: email,
      subject: "Potvrdili jsme přijetí poptávky orientační ceny",
      html: `
        <h2 style="margin-bottom:20px;">Děkujeme za poptávku</h2>
        <hr style="margin:20px 0;" />

        <p>Dobrý den, ${name},</p>

        <p>
          děkujeme za zaslání poptávky orientační ceny. Vaši žádost jsme přijali
          a co nejdříve se vám ozveme s odhadem ceny.
        </p>

        <p><strong>Nahlášený problém:</strong> ${problemLabel}</p>

        <p>
          Pokud budeme potřebovat doplnit informace, ozveme se vám na tento e-mail
          nebo telefon.
        </p>

        <hr style="margin:20px 0;" />

        <p>
          S pozdravem<br />
          <strong>HVservis</strong>
        </p>
      `,
    });

    if ((customerResult as any)?.error) {
      return NextResponse.json(
        { ok: false, error: (customerResult as any).error.message || "Chyba Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("API /api/cena-form error:", error);

    return NextResponse.json(
      { ok: false, error: "Nepodařilo se zpracovat formulář." },
      { status: 500 }
    );
  }
}