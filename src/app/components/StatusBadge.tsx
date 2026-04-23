import React from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

type BadgeType = "ok" | "ng" | "caution";

interface StatusBadgeProps {
  type: BadgeType;
  label?: string;
  className?: string;
}

export function StatusBadge({ type, label, className = "" }: StatusBadgeProps) {
  const configs = {
    ok: {
      defaultLabel: "経費OK",
      colors: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <CheckCircle2 size={16} className="text-emerald-600" />,
    },
    ng: {
      defaultLabel: "NG",
      colors: "bg-rose-100 text-rose-800 border-rose-200",
      icon: <XCircle size={16} className="text-rose-600" />,
    },
    caution: {
      defaultLabel: "迷ったらこれ",
      colors: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <HelpCircle size={16} className="text-amber-600" />,
    },
  };

  const config = configs[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm ${config.colors} ${className}`}
    >
      {config.icon}
      {label || config.defaultLabel}
    </span>
  );
}
