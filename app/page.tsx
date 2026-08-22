"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import VotingCard from "./components/VotingCard";
import ResultCard from "./components/ResultCard";

/* ── Types ── */
interface QuestionOption {
  image: string;
  label: string;
}

interface Question {
  id: number;
  category: string;
  question: string;
  subtitle: string;
  optionA: QuestionOption;
  optionB: QuestionOption;
  correctAnswer: "A" | "B";
  explanation: string;
}

interface Answer {
  questionId: number;
  selected: "A" | "B" | null;
  isCorrect: boolean;
}

type GamePhase = "intro" | "playing" | "result" | "summary";

/* ════════════════════════════════════════════════════════════
   Main Page
   ════════════════════════════════════════════════════════════ */
export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [isAnimating, setIsAnimating] = useState(false);

  /* Load questions */
  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions));
  }, []);

  const currentQuestion = questions[currentIndex];
  const score = answers.filter((a) => a.isCorrect).length;

  /* ── Handlers ── */
  const handleStart = useCallback(() => {
    setGamePhase("playing");
  }, []);

  const handleSelect = useCallback(
    (option: "A" | "B") => {
      if (isAnimating || selectedOption) return;
      setIsAnimating(true);
      setSelectedOption(option);

      // Brief pause to show selection animation, then reveal result
      setTimeout(() => {
        setIsAnimating(false);
        setGamePhase("result");
      }, 600);
    },
    [isAnimating, selectedOption]
  );

  const handleNext = useCallback(() => {
    if (!currentQuestion || !selectedOption) return;

    const answer: Answer = {
      questionId: currentQuestion.id,
      selected: selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswer,
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setGamePhase("playing");
    } else {
      setGamePhase("summary");
    }
  }, [currentQuestion, selectedOption, answers, currentIndex, questions.length]);

  const handleSkip = useCallback(() => {
    if (isAnimating) return;

    const answer: Answer = {
      questionId: currentQuestion?.id ?? 0,
      selected: null,
      isCorrect: false,
    };

    setAnswers((prev) => [...prev, answer]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setGamePhase("playing");
    } else {
      setGamePhase("summary");
    }
  }, [isAnimating, currentQuestion, currentIndex, questions.length]);

  const handlePlayAgain = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setGamePhase("intro");
  }, []);

  /* ── Loading state ── */
  if (questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     INTRO SCREEN
     ════════════════════════════════════════════════════════════ */
  if (gamePhase === "intro") {
    return (
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center w-full max-w-xl">
            {/* Logo */}
            <div className="animate-float mb-8">
              <Image
                src="/uxlogo.jpg"
                alt="UX Western Visayas"
                width={96}
                height={96}
                className="rounded-2xl card-shadow mx-auto"
              />
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-3 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Duo<span className="text-primary">Decide</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              This or That — UX Edition
            </p>
            <p
              className="text-sm md:text-base text-outline mb-10 opacity-0 animate-slide-up mx-auto max-w-xs"
              style={{ animationDelay: "0.3s" }}
            >
              Test your design eye. {questions.length} questions. Pick the better UX choice each round.
            </p>

            {/* Start button */}
            <div
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                type="button"
                onClick={handleStart}
                id="start-game-btn"
                className="
                  relative inline-flex items-center gap-2 px-8 py-4 rounded-xl
                  bg-primary text-on-primary font-bold text-lg
                  hover:bg-primary-dark active:scale-[0.97]
                  transition-all duration-200 animate-pulse-glow
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                "
              >
                Start Game
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            {/* Powered by badge */}
            <p
              className="mt-8 text-xs text-outline opacity-0 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              Powered by{" "}
              <span className="font-semibold text-primary">
                UX Western Visayas
              </span>
            </p>
          </div>
        </main>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     SUMMARY / RESULTS SCREEN
     ════════════════════════════════════════════════════════════ */
  if (gamePhase === "summary") {
    const totalAnswered = answers.filter((a) => a.selected !== null).length;
    const percentage =
      totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

    return (
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center w-full max-w-lg">
            {/* Score circle */}
            <div className="mb-8 animate-score-count">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-primary-container mx-auto flex items-center justify-center card-shadow-active">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-on-primary">
                    {score}
                  </p>
                  <p className="text-sm font-medium text-on-primary/80">
                    of {questions.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <h2
              className="text-3xl font-extrabold text-on-surface mb-2 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {percentage >= 80
                ? "UX Expert! 🎉"
                : percentage >= 50
                  ? "Nice work! 👏"
                  : "Keep learning! 📚"}
            </h2>
            <p
              className="text-base text-on-surface-variant mb-8 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              You got {percentage}% correct ({score} out of {totalAnswered}{" "}
              answered)
            </p>

            {/* Answer breakdown */}
            <div
              className="space-y-3 mb-8 text-left opacity-0 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              {answers.map((answer, idx) => {
                const q = questions.find((q) => q.id === answer.questionId);
                if (!q) return null;

                return (
                  <div
                    key={answer.questionId}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border
                      ${
                        answer.selected === null
                          ? "bg-surface-container border-outline-variant/30"
                          : answer.isCorrect
                            ? "bg-success/5 border-success/20"
                            : "bg-tertiary/5 border-tertiary/20"
                      }
                    `}
                  >
                    {/* Status icon */}
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold
                        ${
                          answer.selected === null
                            ? "bg-outline/10 text-outline"
                            : answer.isCorrect
                              ? "bg-success/10 text-success"
                              : "bg-tertiary/10 text-tertiary"
                        }
                      `}
                    >
                      {answer.selected === null ? (
                        "—"
                      ) : answer.isCorrect ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>

                    {/* Question info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-on-surface truncate">
                        Q{idx + 1}. {q.category}
                      </p>
                      <p className="text-xs text-on-surface-variant truncate">
                        {answer.selected === null
                          ? "Skipped"
                          : `Picked: Option ${answer.selected}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Play again */}
            <div
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <button
                type="button"
                onClick={handlePlayAgain}
                id="play-again-btn"
                className="
                  inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                  bg-primary text-on-primary font-bold text-base
                  hover:bg-primary-dark active:scale-[0.97]
                  transition-all duration-200
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Play Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     VOTING / RESULT SCREEN
     ════════════════════════════════════════════════════════════ */
  return (
    <div className="flex-1 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-5 py-8 md:py-12">
        <div className="w-full max-w-[1200px]">
          {/* Question text */}
          <div className="text-center mb-6 animate-fade-in" key={`q-${currentIndex}`}>
            <h1 className="text-2xl md:text-4xl lg:text-[48px] font-extrabold leading-tight tracking-[-0.02em] text-on-surface mb-2 max-w-3xl mx-auto">
              {currentQuestion.question}
            </h1>
            <p className="text-base text-on-surface-variant">
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <ProgressBar current={currentIndex} total={questions.length} />
          </div>

          {/* Voting cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-start"
            key={`cards-${currentIndex}`}
          >
            {/* Option A */}
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <VotingCard
                image={currentQuestion.optionA.image}
                label={currentQuestion.optionA.label}
                optionLetter="A"
                isSelected={selectedOption === "A"}
                isOtherSelected={selectedOption === "B"}
                isDisabled={selectedOption !== null}
                onClick={() => handleSelect("A")}
              />
            </div>

            {/* OR divider */}
            <div className="hidden md:flex items-center justify-center self-center">
              <span className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-sm font-bold text-on-surface-variant">
                OR
              </span>
            </div>
            <div className="flex md:hidden items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-sm font-bold text-on-surface-variant">
                OR
              </span>
            </div>

            {/* Option B */}
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <VotingCard
                image={currentQuestion.optionB.image}
                label={currentQuestion.optionB.label}
                optionLetter="B"
                isSelected={selectedOption === "B"}
                isOtherSelected={selectedOption === "A"}
                isDisabled={selectedOption !== null}
                onClick={() => handleSelect("B")}
              />
            </div>
          </div>

          {/* Result feedback (shown after selection) */}
          {gamePhase === "result" && currentQuestion && selectedOption && (
            <ResultCard
              isCorrect={selectedOption === currentQuestion.correctAnswer}
              explanation={currentQuestion.explanation}
              correctLabel={
                currentQuestion.correctAnswer === "A"
                  ? currentQuestion.optionA.label
                  : currentQuestion.optionB.label
              }
              onNext={handleNext}
              isLastQuestion={currentIndex === questions.length - 1}
            />
          )}

          {/* Skip button (only during voting phase, before selection) */}
          {gamePhase === "playing" && !selectedOption && (
            <div className="text-center mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <button
                type="button"
                onClick={handleSkip}
                id="skip-question-btn"
                className="
                  inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full
                  border-2 border-outline-variant/40 text-sm font-semibold text-on-surface-variant
                  hover:border-primary/30 hover:text-primary hover:bg-primary-fixed/10
                  active:scale-[0.98] transition-all duration-200
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                "
              >
                Skip this question
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
