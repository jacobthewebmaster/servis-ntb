export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-4 text-3xl font-bold">Kontaktujte nás</h2>

      <p className="mb-8 max-w-3xl text-lg">
        Máte problém s notebookem nebo počítačem? Ozvěte se nám. Rádi vám poradíme
        a navrhneme další postup.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h3 className="mb-2 font-semibold">Telefon</h3>
          <p className="text-lg">
            <a href="tel:+420123456789" className="underline">
              +420&nbsp;123&nbsp;456&nbsp;789
            </a>
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="mb-2 font-semibold">E‑mail</h3>
          <p className="text-lg">
            <a href="mailto:info@servisntb.cz" className="underline">
              info@servisntb.cz
            </a>
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm">
        Diagnostiku provádíme rychle a vždy vás předem informujeme o ceně opravy.
      </p>
    </section>
  );
}
