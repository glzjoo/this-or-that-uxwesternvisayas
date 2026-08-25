interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="flex items-center gap-2 w-full max-w-md mx-auto mt-10">
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          className={`flex-1 h-2 rounded-full transition-all duration-500 ${idx <= current
            ? "bg-gradient-to-r from-primary to-primary-container shadow-[0_0_8px_rgba(115,102,255,0.4)]"
            : "bg-surface-container-high"
            }`}
        />
      ))}
    </div>
  );
}
