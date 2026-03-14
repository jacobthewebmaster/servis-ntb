import ProblemGrid from "@/components/oprava/ProblemGrid";

export default function Krok1Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">S čím má notebook problém?</h1>

      <p className="mt-2 text-slate-600">
        Vyberte problém, který je nejblíž vaší závadě.
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Pokud si nejste jistí, zvolte možnost <strong>„Jiný problém“</strong>.
      </p>

      <div className="mt-8">
        <ProblemGrid />
      </div>
    </main>
  );
}