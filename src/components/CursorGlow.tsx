"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringView, setIsHoveringView] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(hover: none)").matches) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;

    const handleMouseMove = (ev: MouseEvent) => {
      tx = ev.clientX;
      ty = ev.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      if (cursor) {
        cursor.style.left = `${cx}px`;
        cursor.style.top = `${cy}px`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    const handleMouseOver = (ev: MouseEvent) => {
      const t = ev.target as HTMLElement;
      if (!t) return;

      if (t.closest(".card") || t.closest(".gallery-item") || t.closest(".swiper-slide")) {
        setIsHoveringView(true);
        setIsHovering(false);
        setText("VIEW");
      } else if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") ||
        t.closest("button") ||
        t.closest(".feature") ||
        t.closest(".stat-card")
      ) {
        setIsHovering(true);
        setIsHoveringView(false);
        setText("");
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setIsHoveringView(false);
      setText("");
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      id="cursor-glow"
      ref={cursorRef}
      className={`${isHovering ? "hovering" : ""} ${isHoveringView ? "hovering-view" : ""}`}
    >
      {text && <span className="cursor-text">{text}</span>}
    </div>
  );
}
