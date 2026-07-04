"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Cog, Package, Mail } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home",        url: "/#after-hero", icon: Home    },
  { name: "Our Process", url: "/technology", icon: Cog     },
  { name: "Products",   url: "/products",    icon: Package },
  { name: "Contact",    url: "/contact",     icon: Mail    },
];

export function FloatingNav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  const active = NAV_ITEMS.find((i) => {
    if (i.name === "Home") return pathname === "/";
    return pathname.startsWith(i.url);
  })?.name ?? NAV_ITEMS[0].name;

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 640);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);


  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "rgba(10,10,10,0.8)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 9999,
          padding: "4px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              style={{
                position: "relative",
                cursor: "pointer",
                padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 2.5vw, 22px)",
                borderRadius: 9999,
                textDecoration: "none",
                fontSize: "clamp(10px, 2.8vw, 13px)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                transition: "color 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "clamp(4px, 1.5vw, 7px)",
                whiteSpace: "nowrap",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="pill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    background: "#AC033B",
                    zIndex: -1,
                  }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 35 }}
                />
              )}

              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    top: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 32,
                    height: 4,
                    borderRadius: "9999px 9999px 0 0",
                    background: "#AC033B",
                    zIndex: 10,
                  }}
                >
                  <span style={{
                    position: "absolute",
                    width: 48, height: 20,
                    background: "rgba(172,3,59,0.3)",
                    borderRadius: "50%",
                    filter: "blur(8px)",
                    top: -4, left: -8,
                  }} />
                </motion.span>
              )}

              <Icon size={15} strokeWidth={2.5} style={{ flexShrink: 0 }} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
