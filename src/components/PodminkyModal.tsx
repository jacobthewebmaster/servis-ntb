"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PodminkyModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        
        {/* ❌ zavírací křížek */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Podmínky</h2>

        <ul className="space-y-2 text-sm text-slate-700">
          <li>Diagnostika zařízení: 600–1000 Kč</li>
          <li>Platba probíhá až po schválení ceny opravy</li>
          <li>Oprava je zahájena až po odsouhlasení zákazníkem</li>
        </ul>

      </div>
    </div>
  );
}