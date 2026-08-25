
interface ResultCardProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function ResultCard({
  isCorrect,
  explanation,
  onNext,
  isLastQuestion,
}: ResultCardProps) {
  return (
    <div className="animate-result-reveal w-full max-w-4xl mx-auto mt-6">
      <div
        className={`
          w-full flex items-start gap-4 rounded-xl px-6 py-5 border-2 mb-6
          ${isCorrect
            ? "bg-success/5 border-success/20"
            : "bg-tertiary/5 border-tertiary/20"
          }
        `}
      >
        {/* Icon */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-tertiary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Explanation text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {explanation}
          </p>
        </div>
      </div>

      {/* Next button centered below */}
      <div className="flex justify-center w-full">
        <button
          type="button"
          onClick={onNext}
          id="next-question-btn"
          className="
            inline-flex items-center gap-2 px-8 py-3 rounded-full
            bg-primary text-on-primary font-bold text-sm
            hover:bg-primary-dark active:scale-[0.98]
            transition-all duration-200 shadow-md hover:shadow-lg
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
