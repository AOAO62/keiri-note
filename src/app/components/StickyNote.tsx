import React from "react";

interface StickyNoteProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  rotation?: "left" | "right" | "none";
  colorTheme?: "yellow" | "teal";
}

export function StickyNote({ title, children, className = "", rotation = "right", colorTheme = "yellow" }: StickyNoteProps) {
  const rotationClass = {
    left: "-rotate-2 hover:rotate-0",
    right: "rotate-2 hover:rotate-0",
    none: "",
  }[rotation];

  const themeClasses = {
    yellow: {
      bg: "bg-yellow-100/90",
      topBar: "bg-yellow-200/50",
      title: "text-yellow-900 border-yellow-300/50",
    },
    teal: {
      bg: "bg-teal-50/90",
      topBar: "bg-teal-100/50",
      title: "text-teal-900 border-teal-200/50",
    }
  }[colorTheme];

  return (
    <div
      className={`${themeClasses.bg} text-stone-800 p-5 rounded-sm shadow-md transition-transform duration-300 ${rotationClass} ${className} relative overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 w-full h-3 ${themeClasses.topBar}`} />
      
      {title && (
        <h4 className={`font-bold text-sm mb-2 border-b pb-1 inline-block ${themeClasses.title}`}>
          💡 {title}
        </h4>
      )}
      <div className="text-sm leading-relaxed whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}
