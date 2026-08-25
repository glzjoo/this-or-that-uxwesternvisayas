import Image from "next/image";

interface VotingCardProps {
  image: string;
  label: string;
  optionLetter: "A" | "B";
  isSelected: boolean;
  isOtherSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export default function VotingCard({
  image,
  label,
  optionLetter,
  isSelected,
  isOtherSelected,
  isDisabled,
  onClick,
}: VotingCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      id={`voting-card-${optionLetter.toLowerCase()}`}
      className={`
        voting-card group relative flex flex-col rounded-xl overflow-hidden cursor-pointer
        bg-surface-container-lowest border-2 w-full
        ${isSelected
          ? "border-primary card-shadow-active animate-card-select scale-100"
          : isOtherSelected
            ? "border-transparent opacity-50 scale-[0.97]"
            : "border-transparent card-shadow hover:-translate-y-1 hover:card-shadow-hover"
        }
        ${isDisabled && !isSelected && !isOtherSelected ? "pointer-events-none" : ""}
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
            absolute bottom-3 left-3 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-[0.05em]
            backdrop-blur-md
            ${isSelected
              ? "bg-primary text-on-primary"
              : "bg-on-surface/60 text-surface-container-lowest"
            }
          `}
        >
          Option {optionLetter}
        </div>

        {/* Selected check overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center animate-bounce-in">
              <svg
                className="w-8 h-8 text-on-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
