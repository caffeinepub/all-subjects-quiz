import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Send,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { Answer, Question } from "../backend.d.ts";
import { useApp } from "../context/AppContext";
import { useQuizQuestions, useSubmitQuiz } from "../hooks/useQueries";

type AnswerMap = Record<string, number>;
const QUIZ_SKELETON_KEYS = ["qsk-a", "qsk-b", "qsk-c", "qsk-d"];

export default function QuizPage() {
  const { selectedQuiz, selectedSubject, goToResult, goHome } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const { data: questions, isLoading } = useQuizQuestions(
    selectedQuiz?.id ?? null,
  );
  const { mutate: submitQuiz, isPending: isSubmitting } = useSubmitQuiz();

  // Reset on quiz change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset trigger
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
  }, [selectedQuiz]);

  const totalQuestions = questions?.length ?? 0;
  const progress =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = useCallback(
    (question: Question, optionIndex: number) => {
      // Only allow selection if not already answered
      const key = question.id.toString();
      setAnswers((prev) => {
        if (prev[key] !== undefined) return prev; // locked after first selection
        return { ...prev, [key]: optionIndex };
      });
    },
    [],
  );

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    if (questions && currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedQuiz || !questions) return;
    const answerList: Answer[] = questions.map((q) => ({
      questionId: q.id,
      selectedOption: BigInt(answers[q.id.toString()] ?? 0),
    }));
    submitQuiz(
      { quizId: selectedQuiz.id, answers: answerList },
      {
        onSuccess: (result) => {
          goToResult(result);
        },
      },
    );
  };

  if (!selectedQuiz || !selectedSubject) return null;

  if (isLoading) {
    return (
      <main
        className="min-h-screen bg-gray-50 py-8"
        data-ocid="quiz.loading_state"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-3 w-full mb-8" />
          <Skeleton className="h-64 w-full rounded-2xl mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {QUIZ_SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-14 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            No questions found for this quiz.
          </p>
          <Button onClick={goHome} className="mt-4">
            Back to Home
          </Button>
        </div>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id.toString()];
  const isAnswered = selectedAnswer !== undefined;
  const correctOption = Number(currentQuestion.correctOption);
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Quiz Header */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {selectedSubject.name}
              </p>
              <h1 className="text-base font-bold text-foreground">
                {selectedQuiz.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {answeredCount}/{totalQuestions} answered
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmExit(true)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-pill text-xs"
                data-ocid="quiz.secondary_button"
              >
                <X className="w-3.5 h-3.5 mr-1" /> Exit
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id.toString()}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Question Card */}
            <div
              className="bg-white rounded-2xl shadow-card p-6 mb-4"
              data-ocid="quiz.card"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 purple-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {currentIndex + 1}
                </span>
                <p className="text-base font-medium text-foreground leading-relaxed">
                  {currentQuestion.questionText}
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === correctOption;

                // Color logic: only show green/red AFTER answer is selected
                let optionClass =
                  "bg-white border-border hover:border-primary/40 hover:bg-accent/30 cursor-pointer";
                let labelClass =
                  "border-border text-muted-foreground group-hover:border-primary/40";
                let textClass = "text-foreground";

                if (isAnswered) {
                  if (isCorrect) {
                    // Always highlight correct answer in green
                    optionClass = "bg-green-50 border-green-500 cursor-default";
                    labelClass = "bg-green-500 text-white border-green-500";
                    textClass = "text-green-800 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    // Selected wrong answer in red
                    optionClass = "bg-red-50 border-red-500 cursor-default";
                    labelClass = "bg-red-500 text-white border-red-500";
                    textClass = "text-red-800 font-semibold";
                  } else {
                    // Other unselected wrong options
                    optionClass =
                      "bg-gray-50 border-gray-200 cursor-default opacity-60";
                    labelClass = "border-gray-300 text-gray-400";
                    textClass = "text-gray-500";
                  }
                } else if (isSelected) {
                  optionClass = "option-selected border-2 cursor-pointer";
                  labelClass =
                    "bg-primary text-primary-foreground border-primary";
                  textClass = "text-foreground font-medium";
                }

                const optKey = `${currentQuestion.id.toString()}-opt-${idx}`;
                return (
                  <motion.button
                    key={optKey}
                    type="button"
                    whileTap={isAnswered ? {} : { scale: 0.99 }}
                    onClick={() =>
                      !isAnswered && handleSelectOption(currentQuestion, idx)
                    }
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 group ${optionClass}`}
                    data-ocid={`quiz.toggle.${idx + 1}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border transition-colors ${labelClass}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-sm flex-1 ${textClass}`}>
                      {option}
                    </span>
                    {isAnswered && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto flex-shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback message */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl p-3 mb-4 flex items-center gap-2 text-sm font-medium ${
                  selectedAnswer === correctOption
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {selectedAnswer === correctOption ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Sahi jawab! Bohat acha!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    Ghalat jawab. Sahi jawab: Option{" "}
                    {String.fromCharCode(65 + correctOption)}
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="rounded-pill text-sm"
            data-ocid="quiz.secondary_button"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Previous
          </Button>

          <div className="flex items-center gap-2">
            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="purple-gradient text-white rounded-pill text-sm border-0 hover:opacity-90 px-5"
                data-ocid="quiz.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Submit Quiz
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="purple-gradient text-white rounded-pill text-sm border-0 hover:opacity-90 px-5"
                data-ocid="quiz.primary_button"
              >
                Next <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6">
          <p className="text-xs text-muted-foreground mb-2 text-center">
            Question Navigator
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {questions.map((q, idx) => {
              const isAnsweredQ = answers[q.id.toString()] !== undefined;
              const isCurrent = idx === currentIndex;
              const isCorrectQ =
                isAnsweredQ &&
                answers[q.id.toString()] === Number(q.correctOption);
              return (
                <button
                  key={q.id.toString()}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded text-xs font-medium transition-all ${
                    isCurrent
                      ? "purple-gradient text-white"
                      : isAnsweredQ
                        ? isCorrectQ
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : "bg-red-100 text-red-700 border border-red-400"
                        : "bg-white border border-border text-muted-foreground hover:border-primary/40"
                  }`}
                  data-ocid={`quiz.toggle.${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit at bottom */}
        <div className="mt-6 pt-6 border-t border-border flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || answeredCount === 0}
            variant="outline"
            className="rounded-pill text-sm border-primary/40 text-primary hover:bg-accent"
            data-ocid="quiz.submit_button"
          >
            {isSubmitting
              ? "Submitting..."
              : `Submit Quiz (${answeredCount}/${totalQuestions} answered)`}
          </Button>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmExit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            data-ocid="quiz.dialog"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">
                Exit Quiz?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your progress will be lost. Are you sure you want to exit?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmExit(false)}
                  className="flex-1 rounded-pill"
                  data-ocid="quiz.cancel_button"
                >
                  Continue Quiz
                </Button>
                <Button
                  onClick={goHome}
                  className="flex-1 rounded-pill bg-destructive text-white border-0 hover:opacity-90"
                  data-ocid="quiz.confirm_button"
                >
                  Exit Quiz
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
