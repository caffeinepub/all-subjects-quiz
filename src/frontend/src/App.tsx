import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AppProvider, useApp } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import SubjectPage from "./pages/SubjectPage";

function AppContent() {
  const { page } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        {page === "home" && <HomePage />}
        {page === "subject" && <SubjectPage />}
        {page === "quiz" && <QuizPage />}
        {page === "result" && <ResultPage />}
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
