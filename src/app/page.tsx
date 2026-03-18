export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* HERO */}
      <section>
        <h1 className="text-3xl font-bold">Opravy notebooků po celé ČR</h1>

        <p className="mt-3 text-slate-600">
          Diagnostika zdarma při realizaci opravy. Opravu provádíme až po
          schválení ceny.
        </p>

        <div className="mt-6">
          <a
            href="/oprava/krok-1"
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold"
          >
            Zjistit orientační cenu
          </a>
        </div>
      </section>

      {/* JAK TO FUNGUJE */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Jak to funguje</h2>

        <div className="grid gap-3 text-slate-600">
          <div>1️⃣ Vyplníte formulář</div>
          <div>2️⃣ Pošlete notebook</div>
          <div>3️⃣ Provedeme diagnostiku</div>
          <div>4️⃣ Po schválení provedeme opravu</div>
        </div>
      </section>

      {/* DŮVĚRA */}
      <section className="mt-12 rounded-2xl border p-6">
        <div className="mb-2 font-semibold">Proč si vybrat nás</div>

        <div className="space-y-1 text-slate-600">
          <div>✔ Diagnostika zdarma při realizaci opravy</div>
          <div>✔ Doprava k nám zdarma při realizaci opravy</div>
          <div>✔ Opravu provádíme až po vašem schválení ceny</div>
          <div>✔ Opravy po celé ČR</div>
        </div>
      </section>

      {/* ORIENTAČNÍ CENY */}
      <section className="mt-12 rounded-2xl border p-6">
        <h2 className="mb-3 font-semibold">Orientační ceny</h2>

        <div className="space-y-1 text-slate-600">
          <div>Výměna displeje: 3000,-</div>
          <div>Čištění chlazení + přepastování: 1200–1500,-</div>
          <div>Oprava MB: 3000,-</div>
        </div>
      </section>

      {/* ZNAČKY */}
      <section className="mt-12">
        <div className="mb-2 font-semibold">
          ✔ Opravujeme notebooky všech značek
        </div>

        <div className="text-slate-600">
          Lenovo • HP • Dell • Asus • Acer • MSI • a další značky
        </div>

        <div className="mt-2 text-sm text-slate-500">
          Apple zařízení neopravujeme
        </div>
      </section>

      {/* RYCHLOST */}
      <section className="mt-8 text-sm text-slate-600">
        Obvykle odpovídáme do 2 hodin v pracovní dny.
      </section>

      {/* STICKY BUTTON (mobil) */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden">
        <a
          href="/oprava/krok-1"
          className="block rounded-xl bg-black py-3 text-center font-semibold text-white"
        >
          🔧 Objednat opravu
        </a>
      </div>
    </main>
  );
}