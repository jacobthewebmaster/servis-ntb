import { NextResponse } from "next/server";
import { Resend } from "resend";

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

async function fileToAttachment(file: File | null, filename: string) {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());

  return {
    filename: file.name || filename,
    content: buffer,
  };
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const orderId =
      "HV-" + Math.random().toString(36).substring(2, 7).toUpperCase();

    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const note = String(form.get("note") || "");
    const problem = String(form.get("problem") || "");
    const device = String(form.get("device") || "");
    const condition = String(form.get("condition") || "");
    const conditionNote = String(form.get("conditionNote") || "");

    const photoClosed = form.get("photoClosed") as File | null;
    const photoOpen = form.get("photoOpen") as File | null;

    const problemLabel = problemLabels[problem] || problem || "-";

    const attachments = (
      await Promise.all([
        fileToAttachment(photoClosed, "fotka-zavreny.jpg"),
        fileToAttachment(photoOpen, "fotka-otevreny.jpg"),
      ])
    ).filter(Boolean) as any[];

    // 🔧 INTERNÍ MAIL
    const internalResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `🔧 OBJEDNÁVKA – ${orderId} – ${name}`,
      attachments,
      html: `
        <h2>Nová objednávka opravy</h2>
        <hr />

        <p><strong>ID:</strong> ${orderId}</p>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Problém:</strong> ${problemLabel}</p>

        <hr />

        <p><strong>Zařízení:</strong> ${device}</p>
        <p><strong>Stav:</strong> ${condition}</p>
        <p><strong>Popis stavu:</strong> ${conditionNote || "-"}</p>

        <hr />

        <p><strong>Poznámka:</strong> ${note || "-"}</p>
        <p><strong>Fotky:</strong> ${
          attachments.length ? "Ano" : "Ne"
        }</p>
      `,
    });

    if ((internalResult as any)?.error) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // 📩 MAIL ZÁKAZNÍKOVI
    const customerResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: email,
      subject: `Potvrdili jsme objednávku ${orderId}`,
      html: `
        <h2>Děkujeme za objednávku opravy</h2>
        <hr />

        <p>Dobrý den, ${name},</p>

        <p>objednávku jsme přijali a brzy se vám ozveme.</p>

        <p><strong>ID zakázky:</strong> ${orderId}</p>
        <p><strong>Problém:</strong> ${problemLabel}</p>
        <p><strong>Zařízení:</strong> ${device}</p>

        <hr />

        <h3>📦 Jak poslat notebook</h3>

        <p>
          Notebook dobře zabalte a přiložte jméno, telefon a ID zakázky.
        </p>

        <ul>
  <li>
    <strong>Adresa:</strong><br />
    HVservis<br />
    Hybešova 11<br />
    602 00 Brno<br />
    📞 +420 774 506 503<br />
    ✉️ ntbservis@hvshop.cz
  </li>
  <br />
  <li>
    <strong>Zásilkovna / PPL (Candystore):</strong><br />
    Candystore<br />
    Hybešova 11<br />
    602 00 Brno<br />
    📞 +420 774 506 503<br />
    ✉️ ntbservis@hvshop.cz
  </li>
</ul>

        <hr />

        <p>S pozdravem<br /><strong>HVservis</strong></p>
      `,
    });

    if ((customerResult as any)?.error) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("ORDER API ERROR:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}