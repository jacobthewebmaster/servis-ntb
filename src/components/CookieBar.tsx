"use client";

import { useEffect, useState } from "react";

export default function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookies");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookies", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookies", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-4">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-700">
          Používáme cookies pro analýzu návštěvnosti (Google Analytics).
        </p>

        <div className="flex gap-2">
          <button
            onClick={reject}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Odmítnout
          </button>

          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm hover:bg-blue-800"
          >
            Souhlasím
          </button>
        </div>
      </div>
    </div>
  );
}