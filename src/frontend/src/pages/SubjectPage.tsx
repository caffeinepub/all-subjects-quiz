import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, ChevronRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import type { Quiz } from "../backend.d.ts";
import { useApp } from "../context/AppContext";
import { useSubjectQuizzes } from "../hooks/useQueries";

const SUBJECT_META: Record<string, { emoji: string; gradient: string }> = {
  Mathematics: { emoji: "🧮", gradient: "subject-math" },
  Science: { emoji: "🔬", gradient: "subject-science" },
  "Islamic Studies": { emoji: "☪️", gradient: "subject-islamic" },
  "Pakistan Studies": { emoji: "🇵🇰", gradient: "subject-pak" },
  "International Relations": { emoji: "🌍", gradient: "subject-intl" },
  English: { emoji: "✍️", gradient: "subject-english" },
  Urdu: { emoji: "📝", gradient: "subject-urdu" },
};
const DEFAULT_META = { emoji: "📚", gradient: "subject-math" };
const QUIZ_SKELETON_KEYS = ["qs-a", "qs-b", "qs-c", "qs-d", "qs-e"];

function QuizCard({
  quiz,
  index,
  subjectName,
}: { quiz: Quiz; index: number; subjectName: string }) {
  const { goToQuiz } = useApp();
  const meta = SUBJECT_META[subjectName] ?? DEFAULT_META;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
      data-ocid={`quizzes.item.${index + 1}`}
    >
      <div
        className={`${meta.gradient} h-24 flex items-center justify-between px-6 relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
          }}
        />
        <div>
          <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
            {subjectName}
          </p>
          <h3 className="text-white font-bold text-xl">{quiz.name}</h3>
        </div>
        <span className="text-4xl">{meta.emoji}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-xs">50 Questions</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">~25 minutes</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            MCQ Format
          </Badge>
          <Button
            size="sm"
            className="purple-gradient text-white rounded-pill text-xs border-0 hover:opacity-90 transition-opacity px-4"
            onClick={() => goToQuiz(quiz)}
            data-ocid={`quizzes.primary_button.${index + 1}`}
          >
            Start Quiz <ChevronRight className="w-3 h-3 ml-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SubjectPage() {
  const { selectedSubject, goHome } = useApp();
  const meta = selectedSubject
    ? (SUBJECT_META[selectedSubject.name] ?? DEFAULT_META)
    : DEFAULT_META;
  const { data: quizzes, isLoading } = useSubjectQuizzes(
    selectedSubject?.id ?? null,
  );

  if (!selectedSubject) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className={`${meta.gradient} py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav
            className="flex items-center gap-1.5 text-white/70 text-sm mb-6"
            aria-label="Breadcrumb"
          >
            <button
              type="button"
              onClick={goHome}
              className="hover:text-white transition-colors"
              data-ocid="breadcrumb.link"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">
              {selectedSubject.name}
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <span className="text-4xl">{meta.emoji}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {selectedSubject.name}
              </h1>
              <p className="text-white/80 text-sm mt-1">
                5 Quizzes • 250 Questions Total
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={goHome}
            className="rounded-pill text-sm"
            data-ocid="subject.secondary_button"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Home
          </Button>
          <p className="text-sm text-muted-foreground">
            Select a quiz to begin
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="quizzes.loading_state"
          >
            {QUIZ_SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
              >
                <Skeleton className="h-24 w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-7 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : quizzes && quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quizzes.map((quiz, i) => (
              <QuizCard
                key={quiz.id.toString()}
                quiz={quiz}
                index={i}
                subjectName={selectedSubject.name}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 bg-white rounded-2xl shadow-card"
            data-ocid="quizzes.empty_state"
          >
            <div className="text-5xl mb-4">📚</div>
            <p className="text-muted-foreground">
              No quizzes available for this subject yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
