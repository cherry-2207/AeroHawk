import React, { useRef } from "react";
import { ClassificationResult } from "../types";

const BirdIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22 8.36a1 1 0 0 0-1.28-1.28l-3.23 2.14a1.75 1.75 0 0 1-2.28-.15l-1.63-1.63a3 3 0 0 0-4.24 0L8.7 8.08a1 1 0 1 1-1.42-1.42l.64-.63a5 5 0 0 1 7.07 0l1.63 1.63a3.75 3.75 0 0 1 4.88.32l3.23-2.14A3 3 0 0 1 22 8.36ZM13.8 11.2a1 1 0 1 1-1.4-1.42l5.52-5.52a1 1 0 0 1 1.4 1.42L13.8 11.2ZM11 18.25a.75.75 0 0 0 1.5 0V14.5a.75.75 0 0 0-1.5 0v3.75Z" />
    <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-1.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
  </svg>
);

const DroneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2a1 1 0 0 1 1 1v3.42l3.9-1.67a1 1 0 1 1 .9 1.8l-3.1 1.32c.2.22.38.46.54.72l4.17-1.11a1 1 0 1 1 .52 1.94l-4.17 1.11A5.001 5.001 0 0 1 12 22a5 5 0 0 1-3.66-8.58l-4.17-1.11a1 1 0 1 1 .52-1.94l4.17 1.11c.16-.26.34-.5.54-.72l-3.1-1.32a1 1 0 1 1 .9-1.8L11 6.42V3a1 1 0 0 1 1-1Zm0 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);

const AnalysisIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8V12L14 14" />
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
  </svg>
);

interface ResultCardProps {
  result: ClassificationResult | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!result) {
    return null;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -1 * ((y - height / 2) / (height / 2)) * 10;
    const rotateY = ((x - width / 2) / (width / 2)) * 10;

    card.style.setProperty("--rotateX", `${rotateX}deg`);
    card.style.setProperty("--rotateY", `${rotateY}deg`);
    card.style.setProperty("--glowX", `${x}px`);
    card.style.setProperty("--glowY", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
  };

  const isBird = result.classification === "Bird";
  const iconColor = isBird ? "text-teal-400" : "text-violet-400";
  const bgColor = isBird ? "bg-teal-900/50" : "bg-violet-900/50";
  const borderColor = isBird ? "border-teal-700" : "border-violet-700";
  const progressColor = isBird ? "bg-teal-400" : "bg-violet-400";
  const glowColor = isBird
    ? "rgba(45, 212, 191, 0.15)"
    : "rgba(139, 92, 246, 0.15)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative max-w-md mx-auto p-6 rounded-lg shadow-xl border ${borderColor} ${bgColor} 
        transition-transform duration-300 ease-out
      `}
      style={{
        transformStyle: "preserve-3d",
        transform:
          "perspective(1000px) rotateY(var(--rotateY, 0)) rotateX(var(--rotateX, 0))",
      }}
    >
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 300px at var(--glowX, 50%) var(--glowY, 50%), ${glowColor}, transparent)`,
        }}
        aria-hidden="true"
      ></div>
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-xl font-semibold text-gray-300 mb-4">
          Classification Result
        </h3>
        <div className="flex items-center justify-center space-x-4">
          {isBird ? (
            <BirdIcon className={`w-16 h-16 ${iconColor}`} />
          ) : (
            <DroneIcon className={`w-16 h-16 ${iconColor}`} />
          )}
          <div className="text-left">
            <p className="text-gray-400">Detected Object:</p>
            <p className="text-4xl font-extrabold text-white">
              {result.classification}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-base font-medium text-gray-300">
              Confidence
            </span>
            <span className={`text-lg font-bold ${iconColor}`}>
              {result.confidence.toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className={`${progressColor} h-2.5 rounded-full`}
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
