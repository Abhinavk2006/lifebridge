"use client";

import React from "react";

export function DocumentWatermarkPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.03] select-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="document-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Document Outline Symbol */}
            <path
              d="M20 20 h40 l15 15 v45 h-55 z M60 20 v15 h15"
              fill="none"
              stroke="#1E2761"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Document Lines */}
            <line x1="30" y1="45" x2="65" y2="45" stroke="#1E2761" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="30" y1="55" x2="65" y2="55" stroke="#1E2761" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="30" y1="65" x2="55" y2="65" stroke="#1E2761" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Official Stamp Circle Outline */}
            <circle cx="85" cy="85" r="14" fill="none" stroke="#E8B04B" strokeWidth="1.2" strokeDasharray="3 2" />
            <path d="M80 85 l3 3 l6 -6" fill="none" stroke="#E8B04B" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#document-grid)" />
      </svg>
    </div>
  );
}
