

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
    <div className="animate-result-reveal w-full max-w-4xl mx-auto mt-6">
      <div
        className={`
          flex flex-col md:flex-row items-center gap-8 rounded-xl p-8 border-2
          ${isCorrect
            ? "bg-success/5 border-success/20"
            : "bg-tertiary/5 border-tertiary/20"
          }
        `}
      >
        <div className="flex-1">
          {/* Icon + Status */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center shrink-0
                ${isCorrect ? "bg-success/10" : "bg-tertiary/10"}
              `}
            >
              {isCorrect ? (
                <svg
                  className="w-6 h-6 text-success"
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
                  className="w-6 h-6 text-tertiary"
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
                className={`text-xl font-bold ${isCorrect ? "text-success" : "text-tertiary"}`}
              >
                {isCorrect ? "Great eye!" : "Not quite!"}
              </p>
              <p className="text-base text-on-surface-variant">
                The better UX choice is:{" "}
                <span className="font-bold text-on-surface">
                  {correctLabel}
                </span>
              </p>
            </div>
          </div>

          {/* Explanation */}
          <p className="text-base leading-relaxed text-on-surface-variant mb-6">
            {explanation}
          </p>

          {/* Next button (Manual override) */}
          <button
            type="button"
            onClick={onNext}
            id="next-question-btn"
            className="
              flex justify-center items-center mx-auto gap-2 px-6 py-3 rounded-lg
              bg-primary text-on-primary font-bold text-sm
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

        {/* Timer Section 
        <div className="shrink-0 flex items-center justify-center md:border-l-2 border-t-2 md:border-t-0 border-outline-variant/30 pt-6 md:pt-0 md:pl-8">
          <CountdownTimer duration={5} onComplete={onNext} />
        </div>*/}
      </div>
    </div>
  );
}
