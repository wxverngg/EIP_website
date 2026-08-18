import React from "react";

interface EipIsotypeProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
}

export function EipIsotype({
  className = "",
  width = "100%",
  height = "100%",
  strokeColor = "#C8A04A",
  fillColor = "none",
}: EipIsotypeProps) {
  const textFill = fillColor !== "none" ? fillColor : strokeColor;

  return (
    <svg
      viewBox="0 0 600 300"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pure Typography Watermark: EIP without surrounding geometric shapes */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={textFill}
        stroke={strokeColor}
        strokeWidth="2"
        fontSize="210"
        fontWeight="600"
        letterSpacing="0.06em"
        className="font-serif-title"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
        }}
      >
        EIP
      </text>
    </svg>
  );
}
