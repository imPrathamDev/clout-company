"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BookCardProps {
  chapterNumber?: string;
  title?: string;
  subtitle?: string;
  author?: string;
  year?: string;
  imageUrl?: string;
  content?: string[];
}

export const BookCard: React.FC<BookCardProps> = ({
  chapterNumber = "Chapter 1",
  title = "How To Start",
  subtitle = "Chapter I",
  author = "By Coder",
  year = "2026",
  imageUrl = "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
  content = [
    "Every great journey begins with a single step into the unknown.",
    "When building modern web experiences, smooth motion, interactive elements, and micro-interactions turn an ordinary site into a story.",
    "Keep pushing the boundaries of creative web design.",
  ],
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const innerPageRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Open Animation
  const handleOpen = contextSafe(() => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline();

    // 1. Show glass overlay
    tl.to(overlayRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.4,
      ease: "power2.out",
    });

    // 2. Scale & Center Card
    tl.to(
      cardWrapperRef.current,
      {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1.15,
        zIndex: 50,
        duration: 0.6,
        ease: "back.out(1.2)",
      },
      "<",
    );

    // 3. Open Cover (3D Book Flip)
    tl.to(coverRef.current, {
      rotateY: -160,
      duration: 0.9,
      ease: "power3.inOut",
    });

    // 4. Fade in close button & inner page contents
    tl.to(
      closeBtnRef.current,
      {
        opacity: 1,
        duration: 0.3,
      },
      "-=0.3",
    );
  });

  // Close Animation
  const handleClose = contextSafe((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) return;

    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false),
    });

    // 1. Fade out close button
    tl.to(closeBtnRef.current, {
      opacity: 0,
      duration: 0.2,
    });

    // 2. Close Cover
    tl.to(coverRef.current, {
      rotateY: 0,
      duration: 0.7,
      ease: "power3.inOut",
    });

    // 3. Reset Card Position
    tl.to(
      cardWrapperRef.current,
      {
        position: "relative",
        top: "auto",
        left: "auto",
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        zIndex: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.3",
    );

    // 4. Hide glass overlay
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      },
      "<",
    );
  });

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-8 font-sans"
    >
      {/* Background Glass Blur Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-md opacity-0 pointer-events-none z-40 transition-opacity duration-300"
      />

      {/* Main Card Container */}
      <div
        ref={cardWrapperRef}
        onClick={!isOpen ? handleOpen : undefined}
        className={`relative w-80 sm:w-96 h-[500px] cursor-pointer transition-shadow duration-300 [perspective:1500px] ${
          isOpen ? "" : "hover:scale-[1.02]"
        }`}
      >
        {/* INNER PAGE (Revealed on Open) */}
        <div
          ref={innerPageRef}
          className="absolute inset-0 bg-stone-50 rounded-2xl p-6 shadow-2xl flex flex-col justify-between border border-stone-200 overflow-hidden"
        >
          <div className="space-y-4 pt-4">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Inside {subtitle}
            </span>
            <h3 className="text-2xl font-bold text-stone-800 border-b border-stone-200 pb-2">
              {title}
            </h3>
            <div className="space-y-3 text-stone-600 text-sm leading-relaxed pt-2">
              {content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="text-xs text-stone-400 font-mono text-right">
            Page 01
          </div>
        </div>

        {/* FRONT COVER (Flips Open) */}
        <div
          ref={coverRef}
          className="absolute inset-0 bg-[#f8f8f7] rounded-2xl p-6 shadow-xl border border-stone-200/80 flex flex-col justify-between select-none [transform-style:preserve-3d] [transform-origin:left]"
        >
          {/* Spine Highlight Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-stone-300/40 to-transparent rounded-l-2xl" />

          {/* Cover Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-stone-800">
              {chapterNumber}
            </h2>
            <h3 className="text-2xl font-extrabold tracking-tight text-stone-800">
              {title}
            </h3>
            <div className="w-full border-b border-stone-200 my-3" />
            <p className="text-xs font-mono text-stone-400 uppercase tracking-wider">
              {subtitle}
            </p>
          </div>

          {/* Cover Image */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner my-2">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cover Footer */}
          <div className="flex justify-between items-center text-[11px] font-mono text-stone-400 pt-2">
            <span>{author}</span>
            <span>{year}</span>
          </div>
        </div>

        {/* Close Button (Appears when open) */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="absolute -top-4 -right-4 opacity-0 z-50 bg-white/90 text-stone-700 hover:bg-stone-100 w-8 h-8 rounded-full shadow-md flex items-center justify-center font-bold text-sm border border-stone-200 transition-colors"
          aria-label="Close book"
        >
          ✕
        </button>
      </div>

      {/* Bottom Text Prompt */}
      {!isOpen && (
        <p className="mt-6 text-xs font-mono text-stone-500 tracking-wide">
          Read this chapter (I)
        </p>
      )}
    </div>
  );
};
