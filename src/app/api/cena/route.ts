import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

async function sendOrThrow(args: Parameters<typeof resend.emails.send>[0], label: string) {
  const r: any = await resend.emails.send(args);

  // Resend typicky vrací { data, error } – a error nemusí být throw
  console.log(`RESEND ${label}:`, r);

  if (r?.error) {
    const msg = r.error?.message ?? JSON.stringify(r.error);
    throw new Error(`Resend ${label} error: ${msg}`);
  }

  return r;
}

export async function POST(req: Request) {
  try {
    const MAIL_FROM = requiredEnv("MAIL_FROM");
    const MAIL_TO = requiredEnv("MAIL_TO");

    const form = await req.formData();

    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const desc = String(form.get("desc") ?? "");
    const sn = String(form.get("sn") ?? "");
    const pn = String(form.get("pn") ?? "");
    const problemKey = String(form.get("problemKey") ?? "");
    const problemLabel = String(form.get("problemLabel") ?? "");

    if (!name || !email || !desc || !sn || !pn || !problemKey || !problemLabel) {
      return NextResponse.json(
        { error: "Vyplňte prosím všechna povinná pole (včetně SN/PN)." },
        { status: 400 }
      );
    }

    // příloha (volitelná)
    const file = form.get("attachment");
    let attachment: { filename: string; content: string } | null = null;

    if (file instanceof File && file.size > 0) {
      const MAX = 5 * 1024 * 1024; // 5 MB
      if (file.size > MAX) {
        return NextResponse.json(
          { error: "Příloha je moc velká (max 5 MB). Pošlete prosím menší soubor." },
          { status: 400 }
        );
      }

      const buf = Buffer.from(await file.arrayBuffer());
      attachment = {
        filename: file.name || "priloha",
        content: buf.toString("base64"),
      };
    }

    const subjectToCustomer = `Potvrzení přijetí poptávky (or. cena) – ${problemLabel}`;
    const subjectToUs = `Poptávka orientační ceny – ${name} – ${problemLabel}`;

    const textCommon = [
      `Problém: ${problemLabel} (${problemKey})`,
      `Jméno/iniciály: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      `SN: ${sn}`,
      `PN/Model: ${pn}`,
      ``,
      `Popis:`,
      desc,
      ``,
      attachment ? `Příloha: ${attachment.filename} (přiloženo)` : `Příloha: (nepřiložena)`,
    ]
      .filter(Boolean)
      .join("\n");

    // 1) mail zákazníkovi
    const r1 = await sendOrThrow(
      {
        from: MAIL_FROM,
        to: [email],
        subject: subjectToCustomer,
        text:
          "Děkujeme, poptávku jsme přijali.\n\n" +
          "Do 24 hodin provedeme diagnostiku/nacenění (dle podmínek) a ozveme se s cenovou nabídkou.\n\n" +
          "Shrnutí:\n" +
          textCommon +
          "\n\n—\nServis NTB",
      },
      "customer"
    );

    // 2) mail vám
    const r2 = await sendOrThrow(
      {
        from: MAIL_FROM,
        to: [MAIL_TO],
        subject: subjectToUs,
        text: textCommon,
        ...(attachment
          ? { attachments: [{ filename: attachment.filename, content: attachment.content }] }
          : {}),
      },
      "admin"
    );

    return NextResponse.json({ ok: true, resend: { customer: r1?.data?.id ?? null, admin: r2?.data?.id ?? null } });
  } catch (e: any) {
    console.error("API /api/cena error:", e);
    return NextResponse.json(
      { error: "Chyba serveru při odeslání emailu.", detail: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
