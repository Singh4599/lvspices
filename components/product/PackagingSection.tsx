"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

interface PackagingSectionProps {
  packaging?: string[];
  certifications?: string[];
  packagingImage?: string;
  categoryName?: string;
  description?: string;
}

export default function PackagingSection({}: PackagingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Card starts tilted, flattens as you scroll into view
  const rotate = useTransform(scrollYProgress, [0, 0.4, 0.6], [35, 0, 0]);
  const scale  = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.85, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  return (
    <section
      ref={containerRef}
      style={{
        background: "#ffffff",
        overflow: "visible",
        position: "relative",
        paddingTop: isMobile ? "28px" : "48px",
        paddingBottom: isMobile ? "48px" : "80px",
      }}
    >
      {/* ── Label + Heading ─────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "24px" : "40px", padding: "0 20px" }}>
        {/* Pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 18px",
          background: "rgba(172,3,59,0.06)",
          border: "1px solid rgba(172,3,59,0.12)",
          borderRadius: "100px", marginBottom: isMobile ? "14px" : "18px",
        }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#AC033B", display: "inline-block" }} />
          <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: "10px", letterSpacing: "0.28em", fontWeight: 600 }}>
            Packaging &amp; Specs
          </span>
        </div>

        {/* Heading — responsive */}
        <h2 className="font-display font-bold" style={{
          fontSize: isMobile ? "2.2rem" : "clamp(2.8rem, 5vw, 4.2rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          color: "#0a0a0a",
          margin: "0 0 4px",
        }}>
          Built for every
        </h2>
        <h2 className="font-serif font-medium" style={{
          fontSize: isMobile ? "1.4rem" : "clamp(1.6rem, 2.8vw, 2.2rem)",
          lineHeight: 1.2,
          fontStyle: "italic",
          color: "#AC033B",
          margin: 0,
        }}>
          supply chain.
        </h2>
      </div>

      {/* ── 3D Card ─────────────────────────────── */}
      <div style={{ perspective: "1200px", padding: isMobile ? "0 16px" : "0 60px" }}>
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            opacity,
            transformOrigin: "center bottom",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Device frame */}
          <div
            style={{
              borderRadius: isMobile ? "18px" : "24px",
              overflow: "hidden",
              border: isMobile ? "3px solid #2a2a2a" : "4px solid #2a2a2a",
              background: "#1a1a1a",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.25), " +
                "0 50px 90px rgba(0,0,0,0.15), " +
                "0 80px 120px rgba(0,0,0,0.08)",
              padding: isMobile ? "4px" : "6px",
            }}
          >
            <div style={{
              borderRadius: isMobile ? "14px" : "18px",
              overflow: "hidden",
              position: "relative",
              width: "100%",
              aspectRatio: isMobile ? "941 / 1672" : "1672 / 941",
              background: "#f5f5f5",
            }}>
              {/* Desktop image */}
              <Image
                src={isMobile ? "/images/products/moq-phone.png" : "/images/products/moq-hero.png"}
                alt="LV Spices Packaging Specs"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
