import React from "react";
import { motion } from "motion/react";

interface PolarBearMessageProps {
  message: string;
  variant?: "default" | "alert" | "success";
  className?: string;
  bubbleSide?: "left" | "right";
}

export function PolarBearMessage({ 
  message, 
  variant = "default", 
  className = "",
  bubbleSide = "right"
}: PolarBearMessageProps) {
  const bgColors = {
    default: "bg-white border-teal-100",
    alert: "bg-orange-50 border-orange-200",
    success: "bg-teal-50 border-teal-200",
  };

  const textColors = {
    default: "text-stone-700",
    alert: "text-orange-900",
    success: "text-teal-900",
  };

  const bearEmoji = variant === "alert" ? "🐻‍❄️💦" : variant === "success" ? "🐻‍❄️✨" : "🐻‍❄️";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-3 ${bubbleSide === "right" ? "flex-row" : "flex-row-reverse"} ${className}`}
    >
      <div className="relative group shrink-0">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm border border-stone-100 group-hover:scale-110 transition-transform">
          {bearEmoji}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
          先生
        </div>
      </div>
      
      <div className={`relative px-4 py-3 rounded-2xl shadow-sm border max-w-sm ${bgColors[variant]} ${textColors[variant]} text-sm leading-relaxed whitespace-pre-line`}>
        {/* Tail */}
        <div className={`absolute bottom-3 ${bubbleSide === "right" ? "-left-2 border-r-[12px]" : "-right-2 border-l-[12px]"} border-y-[8px] border-y-transparent ${variant === "default" ? "border-r-white border-l-white" : variant === "alert" ? "border-r-orange-50 border-l-orange-50" : "border-r-teal-50 border-l-teal-50"} z-10`} />
        {/* Tail outline */}
        <div className={`absolute bottom-3 ${bubbleSide === "right" ? "-left-[9px] border-r-[13px]" : "-right-[9px] border-l-[13px]"} border-y-[9px] border-y-transparent ${variant === "default" ? "border-r-teal-100 border-l-teal-100" : variant === "alert" ? "border-r-orange-200 border-l-orange-200" : "border-r-teal-200 border-l-teal-200"}`} />
        
        {message}
      </div>
    </motion.div>
  );
}
