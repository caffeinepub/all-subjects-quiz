import { type ReactNode, createContext, useContext, useState } from "react";
import type { Quiz, QuizResult, Subject } from "../backend.d.ts";

export type Page = "home" | "subject" | "quiz" | "result";

interface AppState {
  page: Page;
  selectedSubject: Subject | null;
  selectedQuiz: Quiz | null;
  quizResult: QuizResult | null;
  navigateTo: (page: Page, subject?: Subject, quiz?: Quiz) => void;
  setQuizResult: (result: QuizResult) => void;
  goHome: () => void;
  goToSubject: (subject: Subject) => void;
  goToQuiz: (quiz: Quiz) => void;
  goToResult: (result: QuizResult) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("home");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResultState] = useState<QuizResult | null>(null);

  const navigateTo = (newPage: Page, subject?: Subject, quiz?: Quiz) => {
    setPage(newPage);
    if (subject) setSelectedSubject(subject);
    if (quiz) setSelectedQuiz(quiz);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setPage("home");
    setSelectedSubject(null);
    setSelectedQuiz(null);
    setQuizResultState(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setPage("subject");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setPage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToResult = (result: QuizResult) => {
    setQuizResultState(result);
    setPage("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setQuizResult = (result: QuizResult) => {
    setQuizResultState(result);
  };

  return (
    <AppContext.Provider
      value={{
        page,
        selectedSubject,
        selectedQuiz,
        quizResult,
        navigateTo,
        setQuizResult,
        goHome,
        goToSubject,
        goToQuiz,
        goToResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
