import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Home,
  RefreshCw,
  Star,
  TrendingUp,
  Trophy,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

function getPerformance(percentage: number) {
  if (percentage >= 90)
    return {
      label: "Excellent! 🏆",
      color: "text-green-600",
      bg: "bg-green-50",
      message: "Outstanding performance! You have mastered this topic.",
    };
  if (percentage >= 75)
    return {
      label: "Very Good! ⭐",
      color: "text-blue-600",
      bg: "bg-blue-50",
      message: "Great job! You have a strong grasp of the subject.",
    };
  if (percentage >= 60)
    return {
      label: "Good! 👍",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      message: "Decent performance! Review a few more topics to improve.",
    };
  if (percentage >= 40)
    return {
      label: "Needs Practice 📖",
      color: "text-amber-600",
      bg: "bg-amber-50",
      message: "Keep practicing! Focus on the topics you found challenging.",
    };
  return {
    label: "Keep Trying! 💪",
    color: "text-red-600",
    bg: "bg-red-50",
    message: "Don't give up! Review the material and try again.",
  };
}

export default function ResultPage() {
  const { quizResult, selectedSubject, selectedQuiz, goHome, goToQuiz } =
    useApp();

  if (!quizResult || !selectedSubject || !selectedQuiz) return null;

  const percentage = Math.round(quizResult.percentage);
  const correct = Number(quizResult.correctCount);
  const incorrect = Number(quizResult.incorrectCount);
  const total = correct + incorrect;
  const perf = getPerformance(percentage);

  // Circumference for circle
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground mb-1">
            {selectedSubject.name}
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            {selectedQuiz.name} — Results
          </h1>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-card p-8 mb-5 text-center"
          data-ocid="result.card"
        >
          {/* Score Circle */}
          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="10"
              />
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#34E3A1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">
                {percentage}%
              </span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
          </div>

          {/* Performance Badge */}
          <div
            className={`inline-flex items-center gap-2 ${perf.bg} rounded-pill px-4 py-2 mb-4`}
          >
            <Trophy className={`w-4 h-4 ${perf.color}`} />
            <span className={`text-sm font-bold ${perf.color}`}>
              {perf.label}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            {perf.message}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xl font-bold text-green-600">
                  {correct}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-xl font-bold text-red-600">
                  {incorrect}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Incorrect</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-xl font-bold text-foreground">
                  {total}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </motion.div>

        {/* Detailed Breakdown */}
        {quizResult.detailedResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-card p-6 mb-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Question Breakdown
              </h2>
            </div>
            <div className="space-y-2">
              {quizResult.detailedResults.map((r, idx) => (
                <div
                  key={r.questionId.toString()}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
                    r.isCorrect ? "bg-green-50" : "bg-red-50"
                  }`}
                  data-ocid={`result.item.${idx + 1}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      r.isCorrect ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {r.isCorrect ? (
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-600" />
                    )}
                  </span>
                  <span className="text-muted-foreground">
                    Question {idx + 1}
                  </span>
                  <Badge
                    variant="outline"
                    className={`ml-auto text-xs ${
                      r.isCorrect
                        ? "border-green-300 text-green-700"
                        : "border-red-300 text-red-700"
                    }`}
                  >
                    {r.isCorrect ? "Correct" : "Incorrect"}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            onClick={() => goToQuiz(selectedQuiz)}
            className="flex-1 purple-gradient text-white rounded-pill border-0 hover:opacity-90 text-sm font-semibold"
            data-ocid="result.primary_button"
          >
            <RefreshCw className="w-4 h-4 mr-1.5" /> Try Again
          </Button>
          <Button
            variant="outline"
            onClick={goHome}
            className="flex-1 rounded-pill text-sm font-semibold"
            data-ocid="result.secondary_button"
          >
            <Home className="w-4 h-4 mr-1.5" /> Back to Home
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
