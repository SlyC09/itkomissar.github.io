import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

const METRIKA_ID = 106047255;

export function Metrika() {
  const location = useLocation();
  const isFirstHit = useRef(true);

  useEffect(() => {
    if (!METRIKA_ID) {
      return;
    }

    if (isFirstHit.current) {
      isFirstHit.current = false;
      return;
    }

    if (typeof window.ym !== "function") {
      return;
    }

    window.ym(METRIKA_ID, "hit", window.location.href, {
      title: document.title,
      referer: document.referrer,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
