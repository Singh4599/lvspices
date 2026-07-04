"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate   = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale    = useTransform(scrollYProgress, [0, 1], isMobile ? [0.75, 0.95] : [1.08, 1]);
  const translate= useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      className="flex items-center justify-center relative"
      style={{ height: isMobile ? "auto" : "160vh", paddingBottom: isMobile ? "40px" : 0 }}
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{ perspective: "1200px", paddingTop: isMobile ? "32px" : "40px" }}
      >
        {/* Title */}
        <motion.div
          style={{ translateY: translate }}
          className="text-center w-full"
        >
          {titleComponent}
        </motion.div>

        {/* 3D Card */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            transformOrigin: "top center",
            marginTop: isMobile ? "40px" : "60px",
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.18), 0 48px 80px rgba(0,0,0,0.22), 0 100px 120px rgba(0,0,0,0.14)",
          }}
          className="w-full mx-auto rounded-[28px] overflow-hidden"
          // Full width with side padding
        >
          <div className="w-full overflow-hidden rounded-[28px]">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
