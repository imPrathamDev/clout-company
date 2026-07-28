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

const CHAT_MESSAGES = [
  {
    title: "Who",
    text: "We identify, size, and validate the highest-converting customer segments before selecting a single creator.",
  },
  {
    title: "When",
    text: "We launch campaigns around seasonal demand, market trends, and cultural moments to maximize reach and conversions.",
  },
  {
    title: "Where",
    text: "We determine the right creators and social platforms based on where your ICP is most active.",
  },
  {
    title: "How",
    text: "We orchestrate the entire campaign—from custom creator discovery and outreach to execution, optimization, and reporting.",
  },
];

// --- Sub-Components ---

/** Small status indicator badge sitting above nodes */
const StatusBadge: React.FC<StatusBadgeProps> = ({ yellow, blue, green }) => (
  <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-0.5 rounded-sm sm:rounded-md bg-[#F5F5F2]/95 border border-black/10 shadow-sm text-[8px] sm:text-[10px] font-mono text-stone-700 pointer-events-none z-20">
    <span className="flex items-center gap-0.5">
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400 inline-block" />
      {yellow}
    </span>
    <span className="flex items-center gap-0.5">
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
      {blue}
    </span>
    <span className="flex items-center gap-0.5">
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 inline-block" />
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
      className={`absolute pointer-events-none flex items-center gap-1 sm:gap-2 md:gap-3 opacity-30 transition-opacity hover:opacity-70 ${
        isTop
          ? "-top-8 sm:-top-10 md:-top-12 left-1/2 -translate-x-1/2 flex-col-reverse"
          : isBottom
            ? "-bottom-8 sm:-bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 flex-col"
            : isLeft
              ? "right-full top-1/2 -translate-y-1/2 flex-row-reverse mr-1.5 sm:mr-2 md:mr-3"
              : "left-full top-1/2 -translate-y-1/2 flex-row ml-1.5 sm:ml-2 md:ml-3"
      }`}
    >
      <div className="w-4 sm:w-6 md:w-8 border-b border-dashed border-stone-400" />
      <div className="flex gap-1 sm:gap-2">
        <div className="w-5 h-4 sm:w-8 sm:h-6 md:w-10 md:h-7 rounded-sm sm:rounded-md border border-stone-300 bg-stone-100 shadow-sm" />
        <div className="w-5 h-4 sm:w-8 sm:h-6 md:w-10 md:h-7 rounded-sm sm:rounded-md border border-stone-300 bg-stone-100 shadow-sm" />
      </div>
    </div>
  );
};

// --- Main Organizational Wheel Component ---

export const OrgWheel: React.FC = () => {
  // Constants for coordinate mapping (used in SVG and % calculations)
  const SVG_SIZE = 520;
  const CENTER = 260;
  const RADIUS = 184;

  return (
    <div className="orch-frame mt-8 md:mt-16 relative flex flex-col overflow-hidden w-full max-w-[1080px] mx-auto min-h-[400px] md:min-h-[600px] rounded-2xl border border-gray-200 shadow-lg">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 w-full h-fit flex justify-between px-4 py-2 border-b border-gray-200 bg-white z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF605C]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD44]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#00CA4E]"></div>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
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
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between h-full pt-12 pb-4 lg:pb-8 bg-[#F4F4F0] px-4 text-stone-800 antialiased overflow-hidden gap-6 lg:gap-0">
        {/* Left: Responsive constraints container for the Wheel */}
        <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[550px] lg:max-w-[600px] aspect-square select-none mx-auto lg:mx-0 lg:ml-2">
          {/* --- SVG Background: Rings, Spokes, Connection Dots --- */}
          <svg
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
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
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 w-max">
            {/* Sunflower Icon */}
            <div className="filter drop-shadow-sm -mb-1 sm:-mb-2">
              <Image
                src={"/assets/images/logo/logo.png"}
                alt="Logo"
                width={60}
                height={30}
                className="h-auto object-contain w-8 sm:w-12 md:w-[60px]"
              />
            </div>

            {/* Center Card */}
            <div className="px-2 sm:px-2.5 py-1 sm:py-1.5 border border-gray-300 rounded-md text-sm sm:text-base md:text-lg tracking-wide bg-white shadow-sm">
              <h4 className="font-serif">Clout OS</h4>
            </div>
          </div>

          {/* --- Department Nodes (Circular Layout) --- */}
          {DEPARTMENTS.map((dept) => {
            // Convert coordinate formulas to PERCENTAGES so they scale beautifully within the parent
            const rad = ((dept.angle - 90) * Math.PI) / 180;
            const xPixel = CENTER + RADIUS * Math.cos(rad);
            const yPixel = CENTER + RADIUS * Math.sin(rad);

            const xPercent = (xPixel / SVG_SIZE) * 100;
            const yPercent = (yPixel / SVG_SIZE) * 100;

            return (
              <div
                key={dept.id}
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center"
              >
                {/* Optional Status Badge */}
                {dept.status && <StatusBadge {...dept.status} />}

                {/* Department Card */}
                <div className="w-[72px] sm:w-[84px] md:w-[92px] py-1.5 sm:py-2 md:py-2.5 px-1 sm:px-2 rounded-md border border-black/10 bg-[#FBFBF8] shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center text-[9px] sm:text-[10px] md:text-xs text-stone-700 tracking-wide font-normal hover:border-stone-400 hover:shadow-md transition-all cursor-pointer leading-tight sm:leading-normal">
                  {dept.label}
                </div>

                {/* Sub-Tree Extensions for specific nodes */}
                {DEPARTMENTS.map((m) => m.id).includes(dept.id) && (
                  <SubTreeExtension angle={dept.angle} />
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Chat Section */}
        <div className="relative z-100 rounded-xl lg:self-stretch w-full lg:w-[calc(100%-620px)] lg:max-w-[420px] h-[400px] lg:h-auto bg-white/60 backdrop-blur-sm flex flex-col border border-black/5 shadow-sm overflow-hidden mt-4 lg:mt-0 lg:mr-0">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-black/5 bg-white/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center shrink-0 overflow-clip">
              <Image
                src={"/assets/images/logo/logo.png"}
                width={22}
                height={22}
                alt="Clout OS"
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-800 leading-tight">
                The Clout Company
              </h3>
              <p className="text-[11px] text-stone-500">by Crescent</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 scrollbar-thin scrollbar-thumb-stone-200">
            {CHAT_MESSAGES.map((msg, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1.5 w-full self-end animate-fade-in-up"
              >
                <div className="self-end w-fit p-2.5 bg-white border border-stone-100 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-[13px] md:text-sm text-stone-600 leading-relaxed">
                  <span>{msg.title}</span>
                </div>

                <div className="w-[80%] self-start flex gap-1">
                  <span className="text-[12px] font-semibold">.::</span>{" "}
                  <p className="text-[12px] font-normal text-foreground ml-1">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input (Visual only) */}
          <div className="p-3 bg-white/80 border-t border-black/5">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F4F0] rounded-full text-[13px] text-stone-400">
              <span className="flex-1">Ask about Clout OS...</span>
              <button className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors">
                <svg
                  className="-rotate-90 w-3.5 h-3.5 text-white translate-x-[1px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgWheel;
