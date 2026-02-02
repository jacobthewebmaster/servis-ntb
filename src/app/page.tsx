import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <section className="rounded-2xl border p-8">
        <h1 className="text-4xl font-bold leading-tight">Oprava notebooku</h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          Nemáte v okolí žádný servis? Notebook si u vás vyzvedneme a po diagnostice
          vám pošleme cenovou nabídku. Opravu provádíme vždy až po vašem schválení ceny.
        </p>

        <div className="mt-8">
          <Link
            href="/oprava/krok-1"
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold"
          >
            Začít opravu
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border p-4 text-sm">
            <div className="font-semibold">Svoz NTB po celé ČR</div>
            <div className="mt-1 text-slate-600">Zásilkovna / kurýr / osobně</div>
          </div>

          <div className="rounded-xl border p-4 text-sm">
            <div className="font-semibold">Diagnostika do 24 hodin</div>
            <div className="mt-1 text-slate-600">+ nacenění opravy</div>
          </div>

          <div className="rounded-xl border p-4 text-sm">
            <div className="font-semibold">Cena vždy předem</div>
            <div className="mt-1 text-slate-600">bez překvapení</div>
          </div>

          <div className="rounded-xl border p-4 text-sm">
            <div className="font-semibold">Opravujeme všechny značky</div>
            <div className="mt-1 text-slate-600">Lenovo, HP, Dell, Asus, Acer…</div>
          </div>

          <div className="rounded-xl border p-4 text-sm">
            <div className="font-semibold">Profesionální přístup</div>
            <div className="mt-1 text-slate-600">průběžně vás informujeme</div>
          </div>

          <div className="rounded-xl border p-4 text-sm">
            <div className="font-semibold">1000+ spokojených zákazníků</div>
            <div className="mt-1 text-slate-600">ověřené zkušenosti</div>
          </div>
        </div>
      </section>
    </main>
  );
}
