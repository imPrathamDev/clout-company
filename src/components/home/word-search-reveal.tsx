"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * "Build across industries" word-search section.
 *
 * - Desktop (>=768px): same horizontal layout as before — words hidden
 *   left-to-right inside a wide grid, pill borders draw themselves in.
 * - Mobile (<768px): fewer words, arranged vertically (top-to-bottom)
 *   in a narrower grid so it doesn't overflow small screens.
 * - On mount, a random batch of 1-3 words reveal themselves together, then
 *   swap out for a new random batch every AUTO_CYCLE_MS.
 * - Hovering a word reveals just that one word and pauses the auto-cycle.
 *
 * Drop-in usage:
 *   <WordSearchReveal />
 */

const DESKTOP_WORDS = [
  "HEALTHTECH",
  "FINTECH",
  "DEVTOOLS",
  "CONSUMER",
  "AI",
  "MARKETPLACE",
  "BEAUTY",
  "EDTECH",
  "GAMING",
  "CREATORS",
  "MEDIA",
  "OPENSOURCE",
];

// Shorter list so a vertical layout stays compact on small screens.
const MOBILE_WORDS = ["AI", "BEAUTY", "GAMING", "MEDIA", "FINTECH", "EDTECH"];

const DESKTOP_COLS = 20; // cross-axis size for the horizontal (desktop) layout
const MOBILE_ROWS = Math.max(...MOBILE_WORDS.map((w) => w.length)) + 2; // cross-axis size for vertical (mobile) layout

const DESKTOP_CELL = 46; // px, matches the 46x46 letter cells in the reference markup
const MOBILE_CELL = 38;

const AUTO_CYCLE_MS = 1800;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MOBILE_BREAKPOINT = "(max-width: 767px)";

type Orientation = "horizontal" | "vertical";

interface WordPlacement {
  word: string;
  orientation: Orientation;
  line: number; // fixed row (horizontal) or fixed column (vertical)
  start: number; // starting column (horizontal) or starting row (vertical)
}

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randomLetter(): string {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

/**
 * Places each word along its own row (horizontal) or column (vertical) at a
 * random offset, then fills every remaining cell with a random letter —
 * words never overlap, everything else is filler.
 */
function buildGrid(
  words: string[],
  orientation: Orientation,
  crossAxisSize: number,
): { grid: string[][]; placements: WordPlacement[] } {
  const order = shuffle(words);
  const rows = orientation === "horizontal" ? order.length : crossAxisSize;
  const cols = orientation === "horizontal" ? crossAxisSize : order.length;
  const grid: string[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, randomLetter),
  );
  const placements: WordPlacement[] = [];

  order.forEach((word, idx) => {
    if (orientation === "horizontal") {
      const maxStart = Math.max(cols - word.length, 0);
      const start = Math.floor(Math.random() * (maxStart + 1));
      for (let i = 0; i < word.length; i++) grid[idx][start + i] = word[i];
      placements.push({ word, orientation, line: idx, start });
    } else {
      const maxStart = Math.max(rows - word.length, 0);
      const start = Math.floor(Math.random() * (maxStart + 1));
      for (let i = 0; i < word.length; i++) grid[start + i][idx] = word[i];
      placements.push({ word, orientation, line: idx, start });
    }
  });

  return { grid, placements };
}

function placementMatches(
  p: WordPlacement,
  rIdx: number,
  cIdx: number,
): boolean {
  return p.orientation === "horizontal"
    ? p.line === rIdx && cIdx >= p.start && cIdx < p.start + p.word.length
    : p.line === cIdx && rIdx >= p.start && rIdx < p.start + p.word.length;
}

export default function WordSearchReveal() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const words = isMobile ? MOBILE_WORDS : DESKTOP_WORDS;
  const orientation: Orientation = isMobile ? "vertical" : "horizontal";
  const cell = isMobile ? MOBILE_CELL : DESKTOP_CELL;
  const crossAxisSize = isMobile ? MOBILE_ROWS : DESKTOP_COLS;
  const fontSize = isMobile ? 19 : 26;
  const letterSpacing = isMobile ? 5.2 : 7.8;

  const { grid, placements } = useMemo(() => {
    if (isMobile === null) {
      return { grid: [] as string[][], placements: [] as WordPlacement[] };
    }
    return buildGrid(words, orientation, crossAxisSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const [activeWords, setActiveWords] = useState<Set<string>>(new Set());
  const [drawnWords, setDrawnWords] = useState<Set<string>>(new Set());
  const isHoveringRef = useRef(false);
  const autoTimerRef = useRef<number | null>(null);

  const reveal = (revealWords: string[]) => {
    setActiveWords(new Set(revealWords));
    setDrawnWords(new Set());
    // Two rAFs: first lets the borders mount at dashoffset=1 (hidden),
    // second flips them to 0 so the transition actually animates the draw.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawnWords(new Set(revealWords)));
    });
  };

  useEffect(() => {
    if (isMobile === null || placements.length === 0) return undefined;

    const tick = () => {
      if (isHoveringRef.current) return;
      // Highlight a random 1-3 words at once (capped to how many exist).
      const count =
        1 + Math.floor(Math.random() * Math.min(3, placements.length));
      const chosen = shuffle(placements)
        .slice(0, count)
        .map((p) => p.word);
      reveal(chosen);
    };
    tick();
    autoTimerRef.current = window.setInterval(tick, AUTO_CYCLE_MS);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placements]);

  const handleWordHoverStart = (word: string) => {
    isHoveringRef.current = true;
    reveal([word]);
  };

  const handleWordHoverEnd = () => {
    isHoveringRef.current = false;
  };

  const cols = grid[0]?.length ?? 0;
  const gridWidth = cols * cell;

  return (
    <div className="w-full py-[80px] md:py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 flex flex-col items-center">
        <h3 className="m-0 text-[24px] md:text-[32px] leading-[115%] tracking-[0.32px] text-center text-[#262323]">
          Distribution powers every category.
        </h3>
        <p className="m-0 text-[15px] font-[460] leading-[140%] tracking-[0.15px] mt-3 text-[#262323]/60 max-w-[460px] text-center">
          Great products are built every day. Few find the people they're meant
          for.
        </p>

        <div className="mt-[40px] md:mt-[60px] flex flex-col justify-center items-center w-full">
          {/* GRID */}
          {isMobile !== null && grid.length > 0 && (
            <div
              className="relative select-none mx-auto font-serif"
              style={{
                fontSize,
                fontWeight: 400,
                lineHeight: "160%",
                letterSpacing,
                width: gridWidth,
              }}
            >
              {/* animated borders, one per hidden word */}
              {placements.map((p) => {
                const width =
                  p.orientation === "horizontal" ? p.word.length * cell : cell;
                const height =
                  p.orientation === "horizontal" ? cell : p.word.length * cell;
                const left =
                  p.orientation === "horizontal"
                    ? p.start * cell
                    : p.line * cell;
                const top =
                  p.orientation === "horizontal"
                    ? p.line * cell
                    : p.start * cell;
                const isDrawn = drawnWords.has(p.word);
                return (
                  <div
                    key={p.word}
                    className="absolute pointer-events-none"
                    style={{ left, top, width, height }}
                  >
                    <svg
                      width={width}
                      height={height}
                      viewBox={`0 0 ${width} ${height}`}
                      style={{ overflow: "visible", display: "block" }}
                    >
                      <defs>
                        <linearGradient
                          id={`ws-grad-${p.word}`}
                          x1="0"
                          y1="0"
                          x2={p.orientation === "horizontal" ? width : 0}
                          y2={p.orientation === "horizontal" ? 0 : height}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#86CEFF" />
                          <stop offset="1" stopColor="#85CCFC" />
                        </linearGradient>
                      </defs>
                      <rect
                        x={2}
                        y={2}
                        width={width - 4}
                        height={height - 4}
                        rx={(cell - 4) / 2}
                        ry={(cell - 4) / 2}
                        fill="none"
                        stroke={`url(#ws-grad-${p.word})`}
                        strokeWidth={2}
                        pathLength={1}
                        style={{
                          strokeDasharray: 1,
                          strokeDashoffset: isDrawn ? 0 : 1,
                          transition: isDrawn
                            ? "stroke-dashoffset 1050ms cubic-bezier(0.4, 0, 0.2, 1)"
                            : "none",
                          filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.08))",
                        }}
                      />
                    </svg>
                  </div>
                );
              })}

              {/* letters */}
              <div className="relative z-10 flex flex-col">
                {grid.map((row, rIdx) => (
                  <div className="flex" key={rIdx}>
                    {row.map((letter, cIdx) => {
                      const placement = placements.find((p) =>
                        placementMatches(p, rIdx, cIdx),
                      );
                      const isActive =
                        !!placement && activeWords.has(placement.word);
                      return (
                        <div
                          key={cIdx}
                          className="flex items-center justify-center"
                          style={{
                            width: cell,
                            height: cell,
                            cursor: placement ? "pointer" : "default",
                          }}
                          onMouseEnter={
                            placement
                              ? () => handleWordHoverStart(placement.word)
                              : undefined
                          }
                          onMouseLeave={
                            placement ? handleWordHoverEnd : undefined
                          }
                        >
                          <span
                            className="leading-none"
                            style={{
                              color: isActive
                                ? "#262323"
                                : "rgba(38, 35, 35, 0.5)",
                              fontWeight: isActive ? 600 : 400,
                              textShadow:
                                "0px 1px 0px rgba(255,255,255,0.30), 0px -1px 1px rgba(0,0,0,0.12)",
                              transition:
                                "color 150ms ease, text-shadow 150ms ease, font-weight 150ms ease",
                            }}
                          >
                            {letter}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
