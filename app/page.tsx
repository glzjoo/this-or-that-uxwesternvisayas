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
              A or B — UX Edition
            </p>
            <p
              className="text-sm md:text-base text-outline mb-10 opacity-0 animate-slide-up mx-auto max-w-xs"
              style={{ animationDelay: "0.3s" }}
            >
              Step right up and take a UI/Visual Quiz. Test your designer instincts with {questions.length} questions.
              For each question, pick whichever visual is the appropriate image or UI element for the goal.
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
        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl opacity-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>

            {/* ── Result Card ── */}
            <div className="rounded-2xl overflow-hidden card-shadow-active border border-outline-variant/30">

              {/* Top banner */}
              <div className="bg-gradient-to-r from-primary to-primary-container px-8 py-6 text-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white -translate-x-12 translate-y-12" />
                </div>

                {/* Star rating */}
                <div className="flex items-center justify-center gap-1 mb-3 relative">
                  {[1, 2, 3].map((star) => (
                    <svg
                      key={star}
                      className={`w-8 h-8 transition-all duration-300 ${percentage >= star * 33
                        ? "text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]"
                        : "text-white/30"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Big score */}
                <p className="text-6xl font-extrabold text-white mb-1">
                  {score}<span className="text-3xl font-medium text-white/70">/{questions.length}</span>
                </p>
                <p className="text-white/80 font-semibold text-lg">
                  {percentage >= 80
                    ? "UX Expert! 🎉"
                    : percentage >= 50
                      ? "Nice work! 👏"
                      : "Keep it up! 📚"}
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-outline-variant/30 bg-surface-container">
                <div className="py-4 text-center">
                  <p className="text-2xl font-extrabold text-success">{score}</p>
                  <p className="text-xs font-medium text-on-surface-variant mt-0.5">Correct</p>
                </div>
                <div className="py-4 text-center">
                  <p className="text-2xl font-extrabold text-tertiary">
                    {answers.filter((a) => a.selected !== null && !a.isCorrect).length}
                  </p>
                  <p className="text-xs font-medium text-on-surface-variant mt-0.5">Wrong</p>
                </div>
                <div className="py-4 text-center">
                  <p className="text-2xl font-extrabold text-outline">
                    {answers.filter((a) => a.selected === null).length}
                  </p>
                  <p className="text-xs font-medium text-on-surface-variant mt-0.5">Skipped</p>
                </div>
              </div>

              {/* Answer breakdown */}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Question Breakdown
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {answers.map((answer, idx) => {
                    const q = questions.find((q) => q.id === answer.questionId);
                    if (!q) return null;
                    return (
                      <div
                        key={answer.questionId}
                        className={`flex items-center gap-3 p-3 rounded-xl border ${answer.selected === null
                          ? "bg-surface-container border-outline-variant/30"
                          : answer.isCorrect
                            ? "bg-success/5 border-success/20"
                            : "bg-tertiary/5 border-tertiary/20"
                          }`}
                      >
                        {/* Icon */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${answer.selected === null
                          ? "bg-outline/10 text-outline"
                          : answer.isCorrect
                            ? "bg-success/15 text-success"
                            : "bg-tertiary/15 text-tertiary"
                          }`}>
                          {answer.selected === null ? (
                            "—"
                          ) : answer.isCorrect ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-on-surface truncate">
                            Q{idx + 1}. {q.category}
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            {answer.selected === null ? "Skipped" : `Picked: Option ${answer.selected}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Play again button */}
              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={handlePlayAgain}
                  id="play-again-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-base hover:bg-primary-dark active:scale-[0.98] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Play Again
                </button>
              </div>
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
          {/* Progress bar */}
          <div className="mb-8">
            <ProgressBar current={currentIndex} total={questions.length} />
          </div>
          {/* Question text */}
          <div className="text-center mb-6 animate-fade-in" key={`q-${currentIndex}`}>
            <h1 className="text-2xl md:text-4xl lg:text-[48px] font-extrabold leading-tight tracking-[-0.02em] text-on-surface mb-2 max-w-3xl mx-auto">
              {currentQuestion.question}
            </h1>
            <p className="text-base text-on-surface-variant">
              {currentQuestion.subtitle}
            </p>
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
