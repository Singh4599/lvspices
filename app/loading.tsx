export default function Loading() {
  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black">
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-2 border-[rgba(172,3,59,0.1)]"
        />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#AC033B] animate-spin"
        />
      </div>
      <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/30 mt-6">
        LV SPICES
      </span>
    </div>
  );
}
