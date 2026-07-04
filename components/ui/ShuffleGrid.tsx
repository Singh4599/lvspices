"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Local LV Spices imagery: spices, factory, lab, cryogenic, farm
const squareData = [
  { id: 1,  src: "/images/hero-spices.png" },
  { id: 2,  src: "/images/factory.png" },
  { id: 3,  src: "/images/lab.png" },
  { id: 4,  src: "/images/farm.png" },
  { id: 5,  src: "/images/farm-editorial.png" },
  { id: 6,  src: "/images/products.png" },
  { id: 7,  src: "/images/cryogenic-bg.png" },
  { id: 8,  src: "/images/cryo-dark.png" },
  { id: 9,  src: "/images/cfg-bg.png" },
  { id: 10, src: "/images/products/agri-hero.png" },
  { id: 11, src: "/images/products/curry-hero.png" },
  { id: 12, src: "/images/products/moq-hero.png" },
  { id: 13, src: "/images/products/no-onion-hero.png" },
  { id: 14, src: "/images/products/packaging-hero.png" },
  { id: 15, src: "/images/products/snack-hero.png" },
  { id: 16, src: "/images/products/spices-hero.png" },
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  let i = arr.length;
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const generateSquares = () =>
  shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f5f0eb",
      }}
    />
  ));

export function ShuffleGrid() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState<React.ReactNode[]>([]);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  useEffect(() => {
    shuffleSquares();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        .shuffle-grid-wrap {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 6px;
          height: 480px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .shuffle-grid-wrap {
            height: 300px;
          }
        }
      `}</style>
      <div className="shuffle-grid-wrap">
        {squares}
      </div>
    </>
  );
}
