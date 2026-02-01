import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <section className="rounded-2xl border p-8">
        <h1 className="text-4xl font-bold leading-tight">Oprava notebooku na dálku</h1>

        <p className="mt-4 max-w-2xl text-lg">
          Vyberte problém, pošlete notebook a my po diagnostice pošleme cenovou nabídku.
          Opravu provádíme vždy až po vašem schválení ceny.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/oprava/krok-1"
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold"
          >
            Začít opravu
          </Link>

          <Link
            href="/oprava/krok-1"
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3"
          >
            Vybrat problém
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border p-4 text-sm">Diagnostika do 24 h</div>
          <div className="rounded-xl border p-4 text-sm">Cena vždy předem</div>
          <div className="rounded-xl border p-4 text-sm">Zásilkovna / kurýr / osobně</div>
        </div>
      </section>
    </main>
  );
}