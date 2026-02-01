import Link from "next/link";

export default function Step2() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Co chcete udělat dál?</h1>
      <p className="mt-2 text-slate-600">
        Můžete si nejdřív zjistit orientační cenu, nebo rovnou objednat opravu.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link className="rounded-xl border p-6 hover:bg-slate-50" href="/oprava/cena">
          <div className="font-semibold">Chci znát orientační cenu</div>
          <div className="mt-2 text-sm text-slate-600">
            Zobrazíme typickou cenu opravy podle zvoleného problému.
          </div>
        </Link>

        <Link className="rounded-xl border p-6 hover:bg-slate-50" href="/oprava/formular">
          <div className="font-semibold">Chci objednat opravu</div>
          <div className="mt-2 text-sm text-slate-600">
            Vyplníte krátký formulář a zvolíte dopravu.
          </div>
        </Link>
      </div>
    </main>
  );
}
