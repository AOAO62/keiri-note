import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { BookOpen, Menu, X } from "lucide-react";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { to: "/", label: "はじめての方へ" },
    { to: "/steps", label: "5つのStep" },
    { to: "/dictionary", label: "これって経費？Q&A" },
  ];

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-stone-700 font-sans selection:bg-teal-200">
      <header className="sticky top-0 z-50 bg-[#F7FAF8]/90 backdrop-blur-md border-b border-teal-100/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-stone-800 tracking-tight hover:opacity-80 transition-opacity">
            <div className="bg-teal-100 p-1.5 rounded-lg text-teal-600 text-2xl leading-none">
              🐻‍❄️
            </div>
            経理のノート
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-teal-600 ${
                    isActive ? "text-teal-600 font-bold border-b-2 border-teal-500 pb-1" : "text-stone-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-teal-50 bg-[#F7FAF8] px-4 py-4 space-y-4 shadow-lg absolute w-full left-0 z-40">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-base font-bold py-2 px-3 rounded-lg ${
                    isActive ? "bg-teal-50 text-teal-700" : "text-stone-600 hover:bg-stone-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      <footer className="bg-[#EEF2F0] py-12 mt-20 border-t border-teal-100/50">
        <div className="max-w-5xl mx-auto px-4 text-center text-stone-500 text-sm">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-xl">🐻‍❄️</span>
            <span className="font-bold tracking-tight">経理のノート</span>
          </div>
          <p>© {new Date().getFullYear()} Keiri no Note. All rights reserved.</p>
          <p className="mt-2 text-xs">※本サイトは初学者向けの一般的なガイドです。実際の税務申告については専門家にご相談ください。</p>
        </div>
      </footer>
    </div>
  );
}
