import Image from "next/image";


interface VotingCardProps {
  image: string;
  label: string;
  optionLetter: "A" | "B";
  isSelected: boolean;
  isOtherSelected: boolean;
  isDisabled: boolean;
  isCorrectOption: boolean;
  showResult: boolean;
  onClick: () => void;
}

export default function VotingCard({
  image,
  label,
  optionLetter,
  isSelected,
  isOtherSelected,
  isDisabled,
  isCorrectOption,
  showResult,
  onClick,
}: VotingCardProps) {
  // Determine state
  const isCorrectSelected = showResult && isSelected && isCorrectOption;
  const isWrongSelected = showResult && isSelected && !isCorrectOption;
  const isCorrectUnselected = showResult && !isSelected && isCorrectOption;
  const isWrongUnselected = showResult && !isSelected && !isCorrectOption;

  let borderColorClass = "border-transparent";
  if (showResult) {
    if (isCorrectSelected || isCorrectUnselected) {
      borderColorClass = "border-success";
    } else if (isWrongSelected) {
      borderColorClass = "border-tertiary";
    }
  } else if (isSelected) {
    borderColorClass = "border-primary";
  }

  let containerClass = "scale-100 opacity-100";
  if (isOtherSelected && !showResult) {
    containerClass = "scale-[0.97] opacity-50";
  } else if (showResult && isWrongUnselected) {
    containerClass = "scale-[0.97] opacity-50";
  } else if (isSelected || isCorrectUnselected) {
    containerClass = "scale-100 opacity-100 shadow-lg animate-card-select card-shadow-active";
  } else {
    containerClass = "scale-100 opacity-100 card-shadow hover:-translate-y-1 hover:card-shadow-hover";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      id={`voting-card-${optionLetter.toLowerCase()}`}
      className={`
        voting-card group relative flex flex-col rounded-xl overflow-hidden cursor-pointer
        bg-surface-container-lowest border-2 w-full
        ${borderColorClass}
        ${containerClass}
        ${isDisabled && !isSelected && !isCorrectUnselected ? "pointer-events-none" : ""}
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
      `}
    >
      {/* Image area */}
      <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
        <Image
          src={image}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`
            object-cover transition-transform duration-300
            ${!isDisabled ? "group-hover:scale-105" : ""}
          `}
        />

        {/* Option badge */}
        <div
          className={`
            absolute bottom-2 sm:bottom-3 left-2 sm:left-3 px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.05em]
            backdrop-blur-md
            ${isSelected && !showResult
              ? "bg-primary text-on-primary"
              : isCorrectSelected || isCorrectUnselected
                ? "bg-success text-white"
                : isWrongSelected
                  ? "bg-tertiary text-white"
                  : "bg-on-surface/60 text-surface-container-lowest"
            }
          `}
        >
          Option {optionLetter}
        </div>

        {/* Overlays */}
        {showResult && (isCorrectSelected || isCorrectUnselected) && (
          <div className="absolute inset-0 bg-success/10 flex items-center justify-center animate-fade-in">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-success/90 flex items-center justify-center animate-bounce-in shadow-lg">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}

        {showResult && isWrongSelected && (
          <div className="absolute inset-0 bg-tertiary/10 flex items-center justify-center animate-fade-in">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-tertiary/90 flex items-center justify-center animate-bounce-in shadow-lg">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
