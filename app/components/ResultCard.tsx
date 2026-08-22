interface ResultCardProps {
  isCorrect: boolean;
  explanation: string;
  correctLabel: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function ResultCard({
  isCorrect,
  explanation,
  correctLabel,
  onNext,
  isLastQuestion,
}: ResultCardProps) {
  return (
    <div className="animate-result-reveal w-full max-w-2xl mx-auto mt-6">
      <div
        className={`
          rounded-xl p-6 border-2
          ${isCorrect
            ? "bg-success/5 border-success/20"
            : "bg-tertiary/5 border-tertiary/20"
          }
        `}
      >
        {/* Icon + Status */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center shrink-0
              ${isCorrect ? "bg-success/10" : "bg-tertiary/10"}
            `}
          >
            {isCorrect ? (
              <svg
                className="w-5 h-5 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-tertiary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div>
            <p
              className={`text-lg font-bold ${isCorrect ? "text-success" : "text-tertiary"}`}
            >
              {isCorrect ? "Great eye!" : "Not quite!"}
            </p>
            <p className="text-sm text-on-surface-variant">
              The better UX choice is:{" "}
              <span className="font-semibold text-on-surface">
                {correctLabel}
              </span>
            </p>
          </div>
        </div>

        {/* Explanation */}
        <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
          {explanation}
        </p>

        {/* Next button */}
        <button
          type="button"
          onClick={onNext}
          id="next-question-btn"
          className="
            inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
            bg-primary text-on-primary font-semibold text-sm
            hover:bg-primary-dark active:scale-[0.98]
            transition-all duration-200
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
          "
        >
          {isLastQuestion ? "See Results" : "Next Question"}
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
