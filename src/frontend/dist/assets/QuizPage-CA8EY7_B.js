import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as createSlot, f as cn, u as useApp, g as useQuizQuestions, h as useSubmitQuiz, S as Skeleton, B as Button, d as Badge, X, A as AnimatePresence, m as motion, i as ArrowRight } from "./index-BjphZOpt.js";
import { C as CircleCheckBig, a as CircleX } from "./circle-x-ILavc_GC.js";
import { A as ArrowLeft } from "./arrow-left-DH1WjvSk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const QUIZ_SKELETON_KEYS = ["qsk-a", "qsk-b", "qsk-c", "qsk-d"];
function QuizPage() {
  const { selectedQuiz, selectedSubject, goToResult, goHome } = useApp();
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState({});
  const [showConfirmExit, setShowConfirmExit] = reactExports.useState(false);
  const { data: questions, isLoading } = useQuizQuestions(
    (selectedQuiz == null ? void 0 : selectedQuiz.id) ?? null
  );
  const { mutate: submitQuiz, isPending: isSubmitting } = useSubmitQuiz();
  reactExports.useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
  }, [selectedQuiz]);
  const totalQuestions = (questions == null ? void 0 : questions.length) ?? 0;
  const progress = totalQuestions > 0 ? (currentIndex + 1) / totalQuestions * 100 : 0;
  const answeredCount = Object.keys(answers).length;
  const handleSelectOption = reactExports.useCallback(
    (question, optionIndex) => {
      const key = question.id.toString();
      setAnswers((prev) => {
        if (prev[key] !== void 0) return prev;
        return { ...prev, [key]: optionIndex };
      });
    },
    []
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
    const answerList = questions.map((q) => ({
      questionId: q.id,
      selectedOption: BigInt(answers[q.id.toString()] ?? 0)
    }));
    submitQuiz(
      { quizId: selectedQuiz.id, answers: answerList },
      {
        onSuccess: (result) => {
          goToResult(result);
        }
      }
    );
  };
  if (!selectedQuiz || !selectedSubject) return null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: "min-h-screen bg-gray-50 py-8",
        "data-ocid": "quiz.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full mb-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-2xl mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: QUIZ_SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, k)) })
        ] })
      }
    );
  }
  if (!questions || questions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No questions found for this quiz." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: goHome, className: "mt-4", children: "Back to Home" })
    ] }) });
  }
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id.toString()];
  const isAnswered = selectedAnswer !== void 0;
  const correctOption = Number(currentQuestion.correctOption);
  const isLastQuestion = currentIndex === questions.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-border sticky top-16 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: selectedSubject.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-foreground", children: selectedQuiz.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
            answeredCount,
            "/",
            totalQuestions,
            " answered"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setShowConfirmExit(true),
              className: "text-destructive hover:text-destructive hover:bg-destructive/10 rounded-pill text-xs min-h-[44px]",
              "data-ocid": "quiz.secondary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 mr-1" }),
                " Exit"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Question ",
            currentIndex + 1,
            " of ",
            totalQuestions
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Math.round(progress),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.25 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-white rounded-2xl shadow-card p-6 mb-4",
                "data-ocid": "quiz.card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 purple-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5", children: currentIndex + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-foreground leading-relaxed", children: currentQuestion.questionText })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === correctOption;
              let optionClass = "bg-white border-border hover:border-primary/40 hover:bg-accent/30 cursor-pointer";
              let labelClass = "border-border text-muted-foreground group-hover:border-primary/40";
              let textClass = "text-foreground";
              if (isAnswered) {
                if (isCorrect) {
                  optionClass = "bg-green-50 border-green-500 cursor-default";
                  labelClass = "bg-green-500 text-white border-green-500";
                  textClass = "text-green-800 font-semibold";
                } else if (isSelected && !isCorrect) {
                  optionClass = "bg-red-50 border-red-500 cursor-default";
                  labelClass = "bg-red-500 text-white border-red-500";
                  textClass = "text-red-800 font-semibold";
                } else {
                  optionClass = "bg-gray-50 border-gray-200 cursor-default opacity-60";
                  labelClass = "border-gray-300 text-gray-400";
                  textClass = "text-gray-500";
                }
              } else if (isSelected) {
                optionClass = "option-selected border-2 cursor-pointer";
                labelClass = "bg-primary text-primary-foreground border-primary";
                textClass = "text-foreground font-medium";
              }
              const optKey = `${currentQuestion.id.toString()}-opt-${idx}`;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  whileTap: isAnswered ? {} : { scale: 0.99 },
                  onClick: () => !isAnswered && handleSelectOption(currentQuestion, idx),
                  className: `w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 group min-h-[52px] ${optionClass}`,
                  "data-ocid": `quiz.toggle.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border transition-colors ${labelClass}`,
                        children: String.fromCharCode(65 + idx)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm flex-1 ${textClass}`, children: option }),
                    isAnswered && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-600 ml-auto flex-shrink-0" }),
                    isAnswered && isSelected && !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-red-600 ml-auto flex-shrink-0" })
                  ]
                },
                optKey
              );
            }) }),
            isAnswered && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3 },
                className: `rounded-xl p-3 mb-4 flex items-center gap-2 text-sm font-medium ${selectedAnswer === correctOption ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`,
                children: selectedAnswer === correctOption ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600 flex-shrink-0" }),
                  "Sahi jawab! Bohat acha!"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-600 flex-shrink-0" }),
                  "Ghalat jawab. Sahi jawab: Option",
                  " ",
                  String.fromCharCode(65 + correctOption)
                ] })
              }
            )
          ]
        },
        currentQuestion.id.toString()
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: handlePrev,
            disabled: currentIndex === 0,
            className: "rounded-pill text-sm min-h-[44px]",
            "data-ocid": "quiz.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 mr-1.5" }),
              " Previous"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: isLastQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSubmit,
            disabled: isSubmitting,
            className: "purple-gradient text-white rounded-pill text-sm border-0 hover:opacity-90 px-5 min-h-[44px]",
            "data-ocid": "quiz.submit_button",
            children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }),
              "Submitting..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Submit Quiz"
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleNext,
            className: "purple-gradient text-white rounded-pill text-sm border-0 hover:opacity-90 px-5 min-h-[44px]",
            "data-ocid": "quiz.primary_button",
            children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 text-center", children: "Question Navigator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 justify-center", children: questions.map((q, idx) => {
          const isAnsweredQ = answers[q.id.toString()] !== void 0;
          const isCurrent = idx === currentIndex;
          const isCorrectQ = isAnsweredQ && answers[q.id.toString()] === Number(q.correctOption);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCurrentIndex(idx),
              className: `w-8 h-8 rounded text-xs font-medium transition-all ${isCurrent ? "purple-gradient text-white" : isAnsweredQ ? isCorrectQ ? "bg-green-100 text-green-700 border border-green-400" : "bg-red-100 text-red-700 border border-red-400" : "bg-white border border-border text-muted-foreground hover:border-primary/40"}`,
              "data-ocid": `quiz.toggle.${idx + 1}`,
              children: idx + 1
            },
            q.id.toString()
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-6 border-t border-border flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleSubmit,
          disabled: isSubmitting || answeredCount === 0,
          variant: "outline",
          className: "rounded-pill text-sm border-primary/40 text-primary hover:bg-accent min-h-[44px]",
          "data-ocid": "quiz.submit_button",
          children: isSubmitting ? "Submitting..." : `Submit Quiz (${answeredCount}/${totalQuestions} answered)`
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showConfirmExit && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
        "data-ocid": "quiz.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            className: "bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground mb-2", children: "Exit Quiz?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Your progress will be lost. Are you sure you want to exit?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setShowConfirmExit(false),
                    className: "flex-1 rounded-pill min-h-[44px]",
                    "data-ocid": "quiz.cancel_button",
                    children: "Continue Quiz"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: goHome,
                    className: "flex-1 rounded-pill bg-destructive text-white border-0 hover:opacity-90 min-h-[44px]",
                    "data-ocid": "quiz.confirm_button",
                    children: "Exit Quiz"
                  }
                )
              ] })
            ]
          }
        )
      }
    ) })
  ] });
}
export {
  QuizPage as default
};
