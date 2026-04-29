import { Suspense } from "react";
import PotvrzeniContent from "./PotvrzeniContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Načítám...</div>}>
      <PotvrzeniContent />
    </Suspense>
  );
}