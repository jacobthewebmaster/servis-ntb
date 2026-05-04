// src/app/api/order/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const problemLabels: Record<string, string> = {
  lcd: "Prasklý / nefunkční displej",
  charging: "Nenabíjí / problém s napájením",
  wont_start: "Nejde zapnout",
  overheating: "Přehřívá se / vypíná se",
  slow: "Pomalý / seká se",
  liquid: "Po polití / vlhkost",
  software: "Problém se softwarem",
  other_mechanical: "Mechanické poškození",
  other: "Jiný problém",
};

async function fileToAttachment(file: File | null, defaultName: string) {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());

  return {
    filename: file.name || defaultName,
    content: buffer.toString("base64"),
  };
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const orderId = "HV-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const note = String(form.get("note") || "").trim();
    const problem = String(form.get("problem") || "");
    const device = String(form.get("device") || "").trim();
    const condition = String(form.get("condition") || "").trim();
    const conditionNote = String(form.get("conditionNote") || "").trim();

    const photoClosed = form.get("photoClosed") as File | null;
    const photoOpen = form.get("photoOpen") as File | null;

    // === VALIDACE ===
    if (!name || !email || !phone || !device || !condition) {
      return NextResponse.json(
        { ok: false, error: "Vyplňte prosím všechny povinné údaje." },
        { status: 400 }
      );
    }

    const problemLabel = problemLabels[problem] || problem || "Neznámý problém";

    // Přílohy
    const attachments = (
      await Promise.all([
        fileToAttachment(photoClosed, "fotka-zavreny.jpg"),
        fileToAttachment(photoOpen, "fotka-otevreny.jpg"),
      ])
    ).filter(Boolean) as { filename: string; content: string }[];

    // 1. Interní email pro servis
    const internalResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `🔧 NOVÁ OBJEDNÁVKA – ${orderId} – ${name}`,
      attachments,
      html: `
        <h2>Nová objednávka opravy</h2>
        <p><strong>ID zakázky:</strong> ${orderId}</p>
        <hr />
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Problém:</strong> ${problemLabel}</p>
        <p><strong>Zařízení:</strong> ${device}</p>
        <p><strong>Stav:</strong> ${condition}</p>
        ${conditionNote ? `<p><strong>Poznámka ke stavu:</strong> ${conditionNote}</p>` : ""}
        ${note ? `<p><strong>Další poznámka:</strong> ${note}</p>` : ""}
        <p><strong>Fotky:</strong> ${attachments.length > 0 ? "Ano (" + attachments.length + ")" : "Ne"}</p>
        <hr />
        <p><em>Nová objednávka přijata.</em></p>
      `,
    });

    if (internalResult.error) {
      console.error("Resend internal error:", internalResult.error);
      return NextResponse.json(
        { ok: false, error: "Chyba při odesílání interního e-mailu." },
        { status: 500 }
      );
    }

    // 2. Potvrzovací email pro zákazníka
    const customerResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: email,
      subject: `✅ Objednávka přijata – ${orderId}`,
      html: `
        <h2>Děkujeme, ${name}!</h2>
        <p>Vaše objednávka opravy byla úspěšně přijata.</p>
        
        <p><strong>Číslo zakázky:</strong> <strong>${orderId}</strong></p>
        <p><strong>Problém:</strong> ${problemLabel}</p>
        <p><strong>Zařízení:</strong> ${device}</p>

        <h3>📦 Jak poslat notebook</h3>
        <p>Na balík prosím napište <strong>${orderId}</strong> a přiložte své jméno a telefon.</p>
        <ul>
          <li>Dobře zabalte notebook (bublinková fólie + pevná krabice)</li>
          <li>Přiložte nabíječku</li>
          <li>Použijte Zásilkovnu, PPL nebo Českou poštu</li>
        </ul>

        <p>Co nejdříve se vám ozveme s cenou a instrukcemi k odeslání.</p>

        <hr />
        <p>
          S pozdravem<br />
          <strong>HV Notebooky</strong><br />
          📞 <a href="tel:+420774506503">774 506 503</a>
        </p>
      `,
    });

    if (customerResult.error) {
      console.error("Resend customer error:", customerResult.error);
      return NextResponse.json(
        { ok: false, error: "Chyba při odesílání potvrzovacího e-mailu." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, orderId });

  } catch (error) {
    console.error("ORDER API ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Nepodařilo se zpracovat objednávku." },
      { status: 500 }
    );
  }
}