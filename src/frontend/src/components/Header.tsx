import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Header() {
  const { goHome, page } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSubjects = () => {
    setMobileOpen(false);
    if (page !== "home") {
      goHome();
      setTimeout(() => {
        document
          .getElementById("subjects")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("subjects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 purple-gradient rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-bold text-foreground tracking-widest uppercase">
                All Subjects
              </span>
              <span className="text-xs font-semibold text-gradient tracking-wider uppercase">
                Quiz
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <button
              type="button"
              onClick={goHome}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === "home"
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              data-ocid="nav.link"
            >
              Home
            </button>
            <button
              type="button"
              onClick={scrollToSubjects}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              data-ocid="nav.link"
            >
              Subjects
            </button>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="purple-gradient text-white rounded-pill px-5 py-2 text-sm font-semibold border-0 hover:opacity-90 transition-opacity shadow-sm"
              onClick={scrollToSubjects}
              data-ocid="nav.primary_button"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Start Learning
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              <button
                type="button"
                onClick={() => {
                  goHome();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                data-ocid="nav.link"
              >
                Home
              </button>
              <button
                type="button"
                onClick={scrollToSubjects}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                data-ocid="nav.link"
              >
                Subjects
              </button>
              <div className="pt-2">
                <Button
                  className="w-full purple-gradient text-white rounded-pill text-sm font-semibold border-0 hover:opacity-90 transition-opacity"
                  onClick={() => {
                    scrollToSubjects();
                    setMobileOpen(false);
                  }}
                  data-ocid="nav.primary_button"
                >
                  Start Learning
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
