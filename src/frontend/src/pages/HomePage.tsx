import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type { Subject } from "../backend.d.ts";
import { useApp } from "../context/AppContext";
import { useAutoInitialize, useSubjects } from "../hooks/useQueries";

const SUBJECT_META: Record<
  string,
  { emoji: string; gradient: string; description: string }
> = {
  Mathematics: {
    emoji: "🧮",
    gradient: "subject-math",
    description: "Algebra, Geometry, Calculus & more",
  },
  Science: {
    emoji: "🔬",
    gradient: "subject-science",
    description: "Physics, Chemistry, Biology",
  },
  "Islamic Studies": {
    emoji: "☪️",
    gradient: "subject-islamic",
    description: "Quran, Hadith, Islamic History",
  },
  "Pakistan Studies": {
    emoji: "🇵🇰",
    gradient: "subject-pak",
    description: "History, Geography, Civics",
  },
  "International Relations": {
    emoji: "🌍",
    gradient: "subject-intl",
    description: "Diplomacy, Foreign Policy, UN",
  },
  English: {
    emoji: "✍️",
    gradient: "subject-english",
    description: "Grammar, Literature, Vocabulary",
  },
  Urdu: {
    emoji: "📝",
    gradient: "subject-urdu",
    description: "Grammar, Poetry, Literature",
  },
};

const DEFAULT_META = {
  emoji: "📚",
  gradient: "subject-math",
  description: "Test your knowledge",
};

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "500+ Questions",
    description:
      "Comprehensive question bank with 500+ carefully curated MCQs across all subjects.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "7 Core Subjects",
    description:
      "Mathematics, Science, Islamic Studies, Pakistan Studies, International Relations, English & Urdu.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Instant Results",
    description:
      "Get immediate feedback with detailed score breakdown, correct answers, and performance analysis.",
    color: "bg-green-100 text-green-600",
  },
];

const HERO_ICONS = ["📚", "🧮", "🔬", "☪️", "🌍", "✍️", "🏆", "⭐"];
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
  const { goToSubject } = useApp();
  const meta = SUBJECT_META[subject.name] ?? DEFAULT_META;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={() => goToSubject(subject)}
      data-ocid={`subjects.item.${index + 1}`}
    >
      <div
        className={`${meta.gradient} h-32 flex items-center justify-center relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, white 0%, transparent 60%)",
          }}
        />
        <span className="text-5xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {meta.emoji}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground mb-1">
          {subject.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">{meta.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs font-medium">
            5 Quizzes • 250 Questions
          </Badge>
          <Button
            size="sm"
            className="purple-gradient text-white rounded-pill text-xs border-0 hover:opacity-90 transition-opacity px-3 h-7"
            onClick={(e) => {
              e.stopPropagation();
              goToSubject(subject);
            }}
            data-ocid={`subjects.primary_button.${index + 1}`}
          >
            Start Quiz <ChevronRight className="w-3 h-3 ml-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { data: subjects, isLoading, isError, refetch } = useSubjects();

  // Auto-initialize backend data on mount
  useAutoInitialize();

  const scrollToSubjects = () => {
    document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-pill px-3 py-1.5 mb-5">
                <Star className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs font-semibold text-white">
                  500+ MCQs Available Now
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                Master Any
                <br />
                <span className="text-yellow-200">Subject</span> with
                <br />
                Confidence
              </h1>
              <p className="text-base text-white/80 leading-relaxed mb-8 max-w-md">
                Challenge yourself with comprehensive quizzes across 7 core
                subjects. Track your progress, identify weak areas, and ace your
                exams.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="cta-gradient text-gray-900 rounded-pill px-6 py-3 text-sm font-bold border-0 hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                  onClick={scrollToSubjects}
                  data-ocid="hero.primary_button"
                >
                  Explore Subjects <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>

            {/* Right: Decorative */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative w-72 h-64 sm:w-80 sm:h-72">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
                    <GraduationCapIcon />
                  </div>
                </div>
                {HERO_ICONS.map((icon, i) => {
                  const angle = (i / HERO_ICONS.length) * 360;
                  const r = 110;
                  const x = Math.cos((angle * Math.PI) / 180) * r;
                  const y = Math.sin((angle * Math.PI) / 180) * r;
                  return (
                    <motion.div
                      key={icon}
                      className="absolute w-11 h-11 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 text-xl"
                      style={{
                        left: `calc(50% + ${x}px - 22px)`,
                        top: `calc(50% + ${y}px - 22px)`,
                      }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 2.5 + i * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {icon}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Choose Your Subject
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select from 7 core subjects. Each subject has 5 quizzes with 50
              questions each.
            </p>
          </motion.div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="subjects.loading_state"
            >
              {SKELETON_KEYS.map((k) => (
                <div
                  key={k}
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                >
                  <Skeleton className="h-32 w-full" />
                  <div className="p-5 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-7 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div
              className="text-center py-16 bg-white rounded-2xl shadow-card"
              data-ocid="subjects.error_state"
            >
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-foreground font-medium mb-2">
                Subjects load nahi ho sakey
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Internet connection check karein aur dobara try karein.
              </p>
              <Button
                onClick={() => refetch()}
                className="purple-gradient text-white border-0 rounded-pill px-6"
              >
                Dobara Try Karein
              </Button>
            </div>
          ) : subjects && subjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subjects.map((subject, i) => (
                <SubjectCard
                  key={subject.id.toString()}
                  subject={subject}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16"
              data-ocid="subjects.loading_state"
            >
              <div className="text-5xl mb-4 animate-pulse">📚</div>
              <p className="text-muted-foreground">
                Subjects load ho rahe hain...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for students who want to excel. Our platform makes learning
              effective, engaging, and fun.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center group"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-white/80 mb-6 text-sm">
              Join thousands of students already using All Subjects Quiz
            </p>
            <Button
              className="cta-gradient text-gray-900 rounded-pill px-8 py-3 text-sm font-bold border-0 hover:opacity-90 transition-all shadow-lg"
              onClick={scrollToSubjects}
              data-ocid="cta.primary_button"
            >
              Get Started Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-20 h-20 text-white"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M32 8L4 22l28 14 28-14L32 8z" opacity="0.9" />
      <path
        d="M10 26v16c0 4 10 10 22 10s22-6 22-10V26L32 38 10 26z"
        opacity="0.7"
      />
      <path d="M56 22v16" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="56" cy="40" r="3" />
    </svg>
  );
}
