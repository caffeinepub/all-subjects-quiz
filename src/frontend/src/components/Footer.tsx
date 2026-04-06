import { Building2, GraduationCap, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";

const SUBJECT_LINKS = [
  { name: "Mathematics", emoji: "🧮" },
  { name: "Science", emoji: "🔬" },
  { name: "Islamic Studies", emoji: "☪️" },
  { name: "Pakistan Studies", emoji: "🇵🇰" },
  { name: "International Relations", emoji: "🌍" },
  { name: "English", emoji: "✍️" },
  { name: "Urdu", emoji: "📝" },
];

export default function Footer() {
  const { goHome } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <button
              type="button"
              onClick={goHome}
              className="flex items-center gap-2.5 mb-4"
            >
              <div className="w-9 h-9 purple-gradient rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-bold text-white tracking-widest uppercase">
                  All Subjects
                </span>
                <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">
                  Quiz
                </span>
              </div>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed">
              Master any subject with our comprehensive quiz platform. 500+ MCQs
              across 7 core subjects.
            </p>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Subjects
            </h3>
            <ul className="space-y-2">
              {SUBJECT_LINKS.map((s) => (
                <li key={s.name}>
                  <button
                    type="button"
                    onClick={goHome}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>{s.emoji}</span>
                    <span>{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm text-gray-300 font-medium">
                  AS Co Limited
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:xylogleam@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  xylogleam@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500 text-center">
            © {year}{" "}
            <span className="text-gray-400 font-medium">AS Co Limited</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
