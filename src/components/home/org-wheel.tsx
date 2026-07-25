import Image from "next/image";
import React from "react";

// --- Interfaces & Data ---
interface StatusBadgeProps {
  yellow: number;
  blue: number;
  green: number;
}

interface NodeData {
  id: string;
  label: string;
  angle: number; // Angle in degrees (0 = top/12 o'clock, clockwise)
  status?: StatusBadgeProps;
  childrenCount?: number;
}

const DEPARTMENTS: NodeData[] = [
  { id: "market_mapping", label: "Market Mapping", angle: 0 },
  { id: "market_sizing", label: "Market Sizing", angle: 45 },
  {
    id: "social_network_selection",
    label: "Social Network Selection",
    angle: 90,
    // status: { yellow: 4, blue: 4, green: 3 },
  },
  { id: "incentive_design", label: "Incentive Design", angle: 135 },
  {
    id: "enablers",
    label: "Enablers",
    angle: 180,
    // status: { yellow: 4, blue: 3, green: 2 },
  },
  { id: "narrative_testing", label: "Narrative Testing", angle: 225 },
  { id: "scaling", label: "Scaling", angle: 270 },
  {
    id: "sales",
    label: "Sales",
    angle: 315,
    // status: { yellow: 3, blue: 2, green: 2 },
  },
];

// --- Sub-Components ---

/** Small status indicator badge sitting above nodes */
const StatusBadge: React.FC<StatusBadgeProps> = ({ yellow, blue, green }) => (
  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#F5F5F2]/95 border border-black/10 shadow-sm text-[10px] font-mono text-stone-700 pointer-events-none z-20">
    <span className="flex items-center gap-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
      {yellow}
    </span>
    <span className="flex items-center gap-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
      {blue}
    </span>
    <span className="flex items-center gap-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      {green}
    </span>
  </div>
);

/** Ghost nodes extending outward from main department nodes */
const SubTreeExtension: React.FC<{ angle: number }> = ({ angle }) => {
  // Determine relative layout direction based on quadrant
  const isTop = angle === 0;
  const isBottom = angle === 180;
  const isLeft = angle > 180 && angle < 360;

  return (
    <div
      className={`absolute pointer-events-none flex items-center gap-3 opacity-30 transition-opacity hover:opacity-70 ${
        isTop
          ? "-top-12 left-1/2 -translate-x-1/2 flex-col-reverse"
          : isBottom
            ? "-bottom-12 left-1/2 -translate-x-1/2 flex-col"
            : isLeft
              ? "right-full top-1/2 -translate-y-1/2 flex-row-reverse mr-3"
              : "left-full top-1/2 -translate-y-1/2 flex-row ml-3"
      }`}
    >
      <div className="w-8 border-b border-dashed border-stone-400" />
      <div className="flex gap-2">
        <div className="w-10 h-7 rounded-md border border-stone-300 bg-stone-100 shadow-sm" />
        <div className="w-10 h-7 rounded-md border border-stone-300 bg-stone-100 shadow-sm" />
      </div>
    </div>
  );
};

// --- Main Organizational Wheel Component ---

export const OrgWheel: React.FC = () => {
  const CENTER = 260;
  const RADIUS = 184;

  return (
    <div className="orch-frame mt-[40px] min-[768px]:mt-[80px] relative flex flex-col overflow-hidden w-full min-[1100px]:w-[1080px] h-auto min-[1000px]:h-[600px] rounded-[16px]">
      <div className="absolute top-0 left-0 w-full h-fit flex justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#FF605C]"></div>
          <div className="size-2 rounded-full bg-[#FFBD44]"></div>
          <div className="size-2 rounded-full bg-[#00CA4E]"></div>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-center h-full pt-8 bg-[#F4F4F0] p-4 text-stone-800 antialiased">
        <div className="relative w-[520px] h-[520px] select-none">
          {/* --- SVG Background: Rings, Spokes, Connection Dots --- */}
          <svg
            viewBox="0 0 520 520"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Main Outer Ring */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Radial Lines & Endpoints */}
            {DEPARTMENTS.map((dept) => {
              const rad = ((dept.angle - 90) * Math.PI) / 180;
              const innerR = 45;
              const outerR = RADIUS;

              const x1 = CENTER + innerR * Math.cos(rad);
              const y1 = CENTER + innerR * Math.sin(rad);
              const x2 = CENTER + outerR * Math.cos(rad);
              const y2 = CENTER + outerR * Math.sin(rad);

              return (
                <g key={dept.id}>
                  {/* Spoke Line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  {/* Inner Connection Dot */}
                  <circle
                    cx={x1}
                    cy={y1}
                    r="2.5"
                    fill="#F4F4F0"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="0.8"
                  />
                  {/* Outer Connection Dot */}
                  <circle
                    cx={x2}
                    cy={y2}
                    r="2.5"
                    fill="#F4F4F0"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="0.8"
                  />
                </g>
              );
            })}
          </svg>

          {/* --- Center Node (Cofounder) --- */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            {/* Sunflower Icon */}
            <div className="text-2xl mb-1 filter drop-shadow-sm transform hover:scale-110 transition-transform cursor-pointer">
              <Image
                src={"/assets/images/dog.png"}
                alt=""
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Center Card */}
            <div className="px-2.5 py-1.5 border border-gray-300 rounded-md text-lg tracking-wide">
              <h4 className="font-serif">Clout OS</h4>
            </div>
          </div>

          {/* --- Department Nodes (Circular Layout) --- */}
          {DEPARTMENTS.map((dept) => {
            // Convert angle to coordinates
            const rad = ((dept.angle - 90) * Math.PI) / 180;
            const x = CENTER + RADIUS * Math.cos(rad);
            const y = CENTER + RADIUS * Math.sin(rad);

            return (
              <div
                key={dept.id}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
              >
                {/* Optional Status Badge */}
                {dept.status && <StatusBadge {...dept.status} />}

                {/* Department Card */}
                <div className="w-[84px] py-2.5 px-2 rounded-md border border-black/10 bg-[#FBFBF8] shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center text-xs text-stone-700 tracking-wide font-normal hover:border-stone-400 hover:shadow-md transition-all cursor-pointer">
                  {dept.label}
                </div>

                {/* Sub-Tree Extensions for specific nodes */}
                {[
                  "legal",
                  "finance",
                  "engineering",
                  "sales",
                  "marketing",
                  "design",
                  "support",
                  "operations",
                ].includes(dept.id) && <SubTreeExtension angle={dept.angle} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrgWheel;
