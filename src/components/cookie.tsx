"use client";
import React, { useState, useEffect } from "react";

interface CookieConsentProps {
  message?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  message = "Do you want to accept cookies?",
  onAccept,
  onDecline,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage on mount to see if a choice was already made
    const savedConsent = localStorage.getItem("cookie-consent");
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
    if (onDecline) onDecline();
  };

  // If the user already answered or it's still checking, render nothing
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 -translate-x-1/2 left-1/2 w-[90vw] md:w-fit md:left-auto md:translate-x-0 md:right-6 flex items-center justify-between md:justify-start gap-6 px-4 py-2 md:px-6 md:py-3 rounded-xl bg-background/60 backdrop-blur-md border border-foreground/10 shadow-lg z-10000">
      <p className="text-[0.75rem] md:text-[1rem] font-medium">{message}</p>

      <div className="flex items-center gap-2 text-[0.75rem] md:text-[1rem] font-semibold">
        <button
          className="cookie-accept-btn cursor-pointer hover:text-foreground/70 transition-colors duration-200"
          onClick={handleAccept}
        >
          Accept
        </button>
        <span>/</span>
        <button
          className="cookie-decline-btn cursor-pointer hover:text-foreground/70 transition-colors duration-200"
          onClick={handleDecline}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
