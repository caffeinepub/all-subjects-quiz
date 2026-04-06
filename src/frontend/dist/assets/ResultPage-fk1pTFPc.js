import { c as createLucideIcon, u as useApp, j as jsxRuntimeExports, m as motion, T as Trophy, k as Star, d as Badge, B as Button } from "./index-BjphZOpt.js";
import { C as CircleCheckBig, a as CircleX } from "./circle-x-ILavc_GC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function getPerformance(percentage) {
  if (percentage >= 90)
    return {
      label: "Excellent! 🏆",
      color: "text-green-600",
      bg: "bg-green-50",
      message: "Outstanding performance! You have mastered this topic."
    };
  if (percentage >= 75)
    return {
      label: "Very Good! ⭐",
      color: "text-blue-600",
      bg: "bg-blue-50",
      message: "Great job! You have a strong grasp of the subject."
    };
  if (percentage >= 60)
    return {
      label: "Good! 👍",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      message: "Decent performance! Review a few more topics to improve."
    };
  if (percentage >= 40)
    return {
      label: "Needs Practice 📖",
      color: "text-amber-600",
      bg: "bg-amber-50",
      message: "Keep practicing! Focus on the topics you found challenging."
    };
  return {
    label: "Keep Trying! 💪",
    color: "text-red-600",
    bg: "bg-red-50",
    message: "Don't give up! Review the material and try again."
  };
}
function ResultPage() {
  const { quizResult, selectedSubject, selectedQuiz, goHome, goToQuiz } = useApp();
  if (!quizResult || !selectedSubject || !selectedQuiz) return null;
  const percentage = Math.round(quizResult.percentage);
  const correct = Number(quizResult.correctCount);
  const incorrect = Number(quizResult.incorrectCount);
  const total = correct + incorrect;
  const perf = getPerformance(percentage);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - percentage / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gray-50 py-6 sm:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "text-center mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: selectedSubject.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground", children: [
            selectedQuiz.name,
            " — Results"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, delay: 0.1 },
        className: "bg-white rounded-3xl shadow-card p-8 mb-5 text-center",
        "data-ocid": "result.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-36 h-36 mx-auto mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                className: "w-full h-full -rotate-90",
                viewBox: "0 0 120 120",
                "aria-hidden": "true",
                focusable: "false",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "60",
                      cy: "60",
                      r: radius,
                      fill: "none",
                      stroke: "#F3F4F6",
                      strokeWidth: "10"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.circle,
                    {
                      cx: "60",
                      cy: "60",
                      r: radius,
                      fill: "none",
                      stroke: "url(#scoreGradient)",
                      strokeWidth: "10",
                      strokeLinecap: "round",
                      strokeDasharray: circumference,
                      initial: { strokeDashoffset: circumference },
                      animate: { strokeDashoffset: dashOffset },
                      transition: { duration: 1.2, ease: "easeOut", delay: 0.3 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "linearGradient",
                    {
                      id: "scoreGradient",
                      x1: "0%",
                      y1: "0%",
                      x2: "100%",
                      y2: "0%",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#7C3AED" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#34E3A1" })
                      ]
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-bold text-foreground", children: [
                percentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Score" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `inline-flex items-center gap-2 ${perf.bg} rounded-pill px-4 py-2 mb-4`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: `w-4 h-4 ${perf.color}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold ${perf.color}`, children: perf.label })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs mx-auto", children: perf.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-green-600", children: correct })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Correct" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-red-600", children: incorrect })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Incorrect" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-foreground", children: total })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" })
            ] })
          ] })
        ]
      }
    ),
    quizResult.detailedResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.3 },
        className: "bg-white rounded-2xl shadow-card p-6 mb-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Question Breakdown" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: quizResult.detailedResults.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center gap-3 p-3 rounded-xl text-sm ${r.isCorrect ? "bg-green-50" : "bg-red-50"}`,
              "data-ocid": `result.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${r.isCorrect ? "bg-green-100" : "bg-red-100"}`,
                    children: r.isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-red-600" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "Question ",
                  idx + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `ml-auto text-xs ${r.isCorrect ? "border-green-300 text-green-700" : "border-red-300 text-red-700"}`,
                    children: r.isCorrect ? "Correct" : "Incorrect"
                  }
                )
              ]
            },
            r.questionId.toString()
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.4 },
        className: "flex flex-col sm:flex-row gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => goToQuiz(selectedQuiz),
              className: "flex-1 purple-gradient text-white rounded-pill border-0 hover:opacity-90 text-sm font-semibold min-h-[44px]",
              "data-ocid": "result.primary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1.5" }),
                " Try Again"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: goHome,
              className: "flex-1 rounded-pill text-sm font-semibold min-h-[44px]",
              "data-ocid": "result.secondary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4 mr-1.5" }),
                " Back to Home"
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  ResultPage as default
};
