import { Toaster } from "@/components/ui/sonner";
import React, { Suspense, lazy } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AppProvider, useApp } from "./context/AppContext";
import HomePage from "./pages/HomePage";

const SubjectPage = lazy(() => import("./pages/SubjectPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ResultPage = lazy(() => import("./pages/ResultPage"));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppContent() {
  const { page } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        {page === "home" && <HomePage />}
        <Suspense fallback={<PageLoader />}>
          {page === "subject" && <SubjectPage />}
          {page === "quiz" && <QuizPage />}
          {page === "result" && <ResultPage />}
        </Suspense>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
