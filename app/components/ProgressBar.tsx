interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="flex items-center gap-4 w-full max-w-md mx-auto">
      {/* Question counter pill */}
      <span className="shrink-0 text-xs font-bold uppercase tracking-[0.05em] text-primary border-2 border-primary/20 rounded-full px-3 py-1.5 bg-primary-fixed/20">
        Question {current + 1} of {total}
      </span>

      {/* Progress track */}
      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-600 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
