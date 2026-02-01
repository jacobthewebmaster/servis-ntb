import ProblemGrid from "@/components/oprava/ProblemGrid";

export default function Step1() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">S čím má váš notebook problém?</h1>
      <p className="mt-2 text-slate-600">
        Vyberte možnost, která je nejblíž vašemu problému.
      </p>

      <div className="mt-8">
        <ProblemGrid />
      </div>
    </main>
  );
}
