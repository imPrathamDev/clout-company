"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * "Build across industries" word-search section.
 *
 * - Renders a grid of random letters with your WORDS hidden horizontally inside it.
 * - Each hidden word gets a pill-shaped border that "draws itself" around the word,
 *   starting from one point and closing the loop (same idea as the reference markup:
 *   an SVG stroke with pathLength=1 animated via stroke-dashoffset).
 * - On mount, a random batch of 1-3 words reveal themselves together, then
 *   swap out for a new random batch every AUTO_CYCLE_MS.
 * - Hovering a word — either in the side list or directly on its letters in
 *   the grid — reveals just that one word and pauses the auto-cycle until
 *   the mouse leaves.
 *
 * Drop-in usage:
 *   <WordSearchReveal />
 */

const WORDS = [
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

const COLS = 20;
const CELL = 46; // px, matches the 46x46 letter cells in the reference markup
const AUTO_CYCLE_MS = 1800;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface WordPlacement {
  word: string;
  row: number;
  colStart: number;
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
 * Places each word on its own row at a random column offset, then fills
 * every remaining cell with a random letter — same visual pattern as the
 * reference: words never overlap, everything else is filler.
 */
function buildGrid(words: string[]): {
  grid: string[][];
  placements: WordPlacement[];
} {
  const rowOrder = shuffle(words);
  const grid: string[][] = rowOrder.map(() =>
    Array.from({ length: COLS }, randomLetter),
  );
  const placements: WordPlacement[] = [];

  rowOrder.forEach((word, rowIdx) => {
    const maxStart = Math.max(COLS - word.length, 0);
    const colStart = Math.floor(Math.random() * (maxStart + 1));
    for (let i = 0; i < word.length; i++) {
      grid[rowIdx][colStart + i] = word[i];
    }
    placements.push({ word, row: rowIdx, colStart });
  });

  return { grid, placements };
}

export default function WordSearchReveal() {
  const { grid, placements } = useMemo(() => buildGrid(WORDS), []);
  const [activeWords, setActiveWords] = useState<Set<string>>(new Set());
  const [drawnWords, setDrawnWords] = useState<Set<string>>(new Set());
  const isHoveringRef = useRef(false);
  const autoTimerRef = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const reveal = (words: string[]) => {
    setActiveWords(new Set(words));
    setDrawnWords(new Set());
    // Two rAFs: first lets the borders mount at dashoffset=1 (hidden),
    // second flips them to 0 so the transition actually animates the draw.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawnWords(new Set(words)));
    });
  };

  useEffect(() => {
    const tick = () => {
      if (isHoveringRef.current) return;
      // Highlight a random 1-3 words at once, never repeating within a batch.
      const count = 1 + Math.floor(Math.random() * 3);
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
  }, []);

  const handleWordHoverStart = (word: string) => {
    isHoveringRef.current = true;
    reveal([word]);
  };

  const handleWordHoverEnd = () => {
    isHoveringRef.current = false;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 flex flex-col items-center">
        <h3 className="m-0 text-[32px] leading-[115%] tracking-[0.32px] text-center text-[#262323]">
          Distribution powers every category.
        </h3>
        <p className="m-0 text-[15px] font-[460] leading-[140%] tracking-[0.15px] mt-3 text-[#262323]/60 max-w-[460px] text-center">
          Great products are built every day. Few find the people they're meant
          for.
        </p>

        <div className="mt-[60px] flex flex-col justify-center items-center w-full">
          {/* GRID */}
          {isMounted && (
            <div
              className="relative select-none mx-auto font-serif"
              style={{
                fontSize: 26,
                fontWeight: 400,
                lineHeight: "160%",
                letterSpacing: 7.8,
                width: COLS * CELL,
              }}
            >
              {/* animated borders, one per hidden word */}
              {placements.map((p) => {
                const width = p.word.length * CELL;
                const left = p.colStart * CELL;
                const top = p.row * CELL;
                const isDrawn = drawnWords.has(p.word);
                return (
                  <div
                    key={p.word}
                    className="absolute pointer-events-none"
                    style={{ left, top, width, height: CELL }}
                  >
                    <svg
                      width={width}
                      height={CELL}
                      viewBox={`0 0 ${width} ${CELL}`}
                      style={{ overflow: "visible", display: "block" }}
                    >
                      <defs>
                        <linearGradient
                          id={`ws-grad-${p.word}`}
                          x1="0"
                          y1="0"
                          x2={width}
                          y2="0"
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
                        height={CELL - 4}
                        rx={(CELL - 4) / 2}
                        ry={(CELL - 4) / 2}
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
                      const placement = placements.find(
                        (p) =>
                          p.row === rIdx &&
                          cIdx >= p.colStart &&
                          cIdx < p.colStart + p.word.length,
                      );
                      const isActive =
                        !!placement && activeWords.has(placement.word);
                      return (
                        <div
                          key={cIdx}
                          className="flex items-center justify-center"
                          style={{
                            width: CELL,
                            height: CELL,
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
