import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const problemLabels: Record<string, string> = {
  battery: "Baterie / nenabíjí",
  display: "Displej / obraz",
  keyboard: "Klávesnice",
  overheating: "Přehřívání",
  slow: "Pomalý notebook",
  wont_start: "Nespustí se",
  other: "Jiný problém",
};

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, email, phone, note, problem } = data;

    const problemLabel = problemLabels[problem] || problem;

    // 1) INTERNÍ MAIL TOBĚ
    const internalResult = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `🔧 Objednávka – ${name} (${problemLabel})`,
      html: `
        <h2 style="margin-bottom:20px;">Nová objednávka opravy</h2>
        <hr style="margin:20px 0;" />

        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Problém:</strong> ${problemLabel}</p>
        <p><strong>Poznámka:</strong> ${note || "-"}</p>

        <hr style="margin:20px 0;" />

        <h3>📦 Jak poslat notebook</h3>

        <p>
          Notebook můžete zaslat libovolným způsobem – doporučujeme Zásilkovnu nebo PPL.
        </p>

        <p>
          <strong>📍 Naše adresa</strong><br />
          HVservis<br />
          Hybešova 11<br />
          602 00 Brno
        </p>

        <p><strong>📦 Doporučené podání</strong></p>
        <ul>
          <li><strong>Zásilkovna / PPL:</strong> The Candy Store – Nové sady 2, Brno</li>
          <li><strong>Z-BOX:</strong> Hybešova 258/20, Brno</li>
          <li><strong>AlzaBox:</strong> Hybešova 258/20, Brno</li>
        </ul>

        <p><strong>ℹ️ Důležité</strong></p>
        <ul>
          <li>Do balíku přiložte jméno a telefonní číslo pro identifikaci zakázky</li>
          <li>Zařízení zabalte do bublinkové fólie</li>
          <li>Použijte pevnou krabici (pokud nemáte originální balení)</li>
          <li>Zařízení v krabici dobře zajistěte proti pohybu</li>
          <li>Po odeslání nám můžete poslat sledovací číslo</li>
        </ul>

        <p style="font-size:12px;color:#666;">
          Za poškození při přepravě bez dostatečného zabalení neneseme odpovědnost.
        </p>

        <hr style="margin:20px 0;" />

        <p>
          S pozdravem<br />
          <strong>HVservis</strong>
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
      subject: "Potvrdili jsme přijetí objednávky opravy",
      html: `
        <h2 style="margin-bottom:20px;">Děkujeme, objednávka opravy byla přijata</h2>
        <hr style="margin:20px 0;" />

        <p>Dobrý den, ${name},</p>

        <p>
          děkujeme za odeslání objednávky. Vaši poptávku jsme přijali
          a brzy se vám ozveme s dalším postupem.
        </p>

        <p><strong>Nahlášený problém:</strong> ${problemLabel}</p>

        <hr style="margin:20px 0;" />

        <h3>📦 Jak poslat notebook</h3>

        <p>
          Notebook můžete zaslat libovolným způsobem – doporučujeme Zásilkovnu nebo PPL.
        </p>

        <p>
          <strong>📍 Naše adresa</strong><br />
          HVservis<br />
          Hybešova 11<br />
          602 00 Brno
        </p>

        <p><strong>📦 Doporučené podání</strong></p>
        <ul>
          <li><strong>Zásilkovna / PPL:</strong> The Candy Store – Nové sady 2, Brno</li>
          <li><strong>Z-BOX:</strong> Hybešova 258/20, Brno</li>
          <li><strong>AlzaBox:</strong> Hybešova 258/20, Brno</li>
        </ul>

        <p><strong>ℹ️ Důležité</strong></p>
        <ul>
          <li>Do balíku přiložte jméno a telefonní číslo pro identifikaci zakázky</li>
          <li>Zařízení zabalte do bublinkové fólie</li>
          <li>Použijte pevnou krabici (pokud nemáte originální balení)</li>
          <li>Zařízení v krabici dobře zajistěte proti pohybu</li>
          <li>Po odeslání nám můžete poslat sledovací číslo</li>
        </ul>

        <p style="font-size:12px;color:#666;">
          Za poškození při přepravě bez dostatečného zabalení neneseme odpovědnost.
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
    console.error("CHYBA API /api/order:", error);

    return NextResponse.json(
      { ok: false, error: "Nepodařilo se zpracovat objednávku." },
      { status: 500 }
    );
  }
}