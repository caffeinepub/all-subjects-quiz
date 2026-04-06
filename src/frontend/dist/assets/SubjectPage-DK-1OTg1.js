import { c as createLucideIcon, u as useApp, a as useSubjectQuizzes, j as jsxRuntimeExports, C as ChevronRight, B as Button, S as Skeleton, b as BookOpen, d as Badge } from "./index-Xoic4KDK.js";
import { A as ArrowLeft } from "./arrow-left-C7Il0BhV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const SUBJECT_META = {
  Mathematics: { emoji: "🧮", gradient: "subject-math" },
  Science: { emoji: "🔬", gradient: "subject-science" },
  "Islamic Studies": { emoji: "☪️", gradient: "subject-islamic" },
  "Pakistan Studies": { emoji: "🇵🇰", gradient: "subject-pak" },
  "International Relations": { emoji: "🌍", gradient: "subject-intl" },
  English: { emoji: "✍️", gradient: "subject-english" },
  Urdu: { emoji: "📝", gradient: "subject-urdu" }
};
const DEFAULT_META = { emoji: "📚", gradient: "subject-math" };
const QUIZ_SKELETON_KEYS = ["qs-a", "qs-b", "qs-c", "qs-d", "qs-e"];
function QuizCard({
  quiz,
  index,
  subjectName
}) {
  const { goToQuiz } = useApp();
  const meta = SUBJECT_META[subjectName] ?? DEFAULT_META;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden",
      "data-ocid": `quizzes.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `${meta.gradient} h-24 flex items-center justify-between px-6 relative overflow-hidden`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-10",
                  style: {
                    backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs font-medium uppercase tracking-wider", children: subjectName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-xl", children: quiz.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: meta.emoji })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "10 Questions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "~10 minutes" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "MCQ Format" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "purple-gradient text-white rounded-pill text-xs border-0 hover:opacity-90 transition-opacity px-4 min-h-[44px]",
                onClick: () => goToQuiz(quiz),
                "data-ocid": `quizzes.primary_button.${index + 1}`,
                children: [
                  "Start Quiz ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 ml-0.5" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function SubjectPage() {
  const { selectedSubject, goHome } = useApp();
  const meta = selectedSubject ? SUBJECT_META[selectedSubject.name] ?? DEFAULT_META : DEFAULT_META;
  const { data: quizzes, isLoading } = useSubjectQuizzes(
    (selectedSubject == null ? void 0 : selectedSubject.id) ?? null
  );
  if (!selectedSubject) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${meta.gradient} py-8 sm:py-12`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-1.5 text-white/70 text-sm mb-6",
          "aria-label": "Breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: goHome,
                className: "hover:text-white transition-colors min-h-[44px] flex items-center",
                "data-ocid": "breadcrumb.link",
                children: "Home"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: selectedSubject.name })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: meta.emoji }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-white", children: selectedSubject.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm mt-1", children: "5 Quizzes • 50 Questions Total" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: goHome,
            className: "rounded-pill text-sm min-h-[44px]",
            "data-ocid": "subject.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 mr-1.5" }),
              " Back to Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select a quiz to begin" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "quizzes.loading_state",
          children: QUIZ_SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl shadow-card overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24" })
                ] })
              ]
            },
            k
          ))
        }
      ) : quizzes && quizzes.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: quizzes.map((quiz, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuizCard,
        {
          quiz,
          index: i,
          subjectName: selectedSubject.name
        },
        quiz.id.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 bg-white rounded-2xl shadow-card",
          "data-ocid": "quizzes.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📚" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No quizzes available for this subject yet." })
          ]
        }
      )
    ] })
  ] });
}
export {
  SubjectPage as default
};
