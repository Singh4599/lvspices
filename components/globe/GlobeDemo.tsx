"use client";
import React from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

const globeConfig = {
  pointSize: 4,
  globeColor: "#ffffff",
  showAtmosphere: true,
  atmosphereColor: "#3a86ff",
  atmosphereAltitude: 0.15,
  emissive: "#000000",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.2)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1200,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 19.076, lng: 72.877 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

// All arcs start from Mumbai HQ — India (19.076, 72.877)
const sampleArcs = [
  // Mumbai → London
  { order: 1, startLat: 19.076, startLng: 72.877, endLat: 51.505, endLng: -0.09, arcAlt: 0.3, color: "#AC033B" },
  // Mumbai → New York
  { order: 2, startLat: 19.076, startLng: 72.877, endLat: 40.712, endLng: -74.006, arcAlt: 0.4, color: "#AC033B" },
  // Mumbai → Dubai
  { order: 3, startLat: 19.076, startLng: 72.877, endLat: 25.204, endLng: 55.270, arcAlt: 0.15, color: "#AC033B" },
  // Mumbai → Singapore
  { order: 4, startLat: 19.076, startLng: 72.877, endLat: 1.352, endLng: 103.820, arcAlt: 0.2, color: "#AC033B" },
  // Mumbai → Sydney
  { order: 5, startLat: 19.076, startLng: 72.877, endLat: -33.868, endLng: 151.209, arcAlt: 0.4, color: "#AC033B" },
  // Mumbai → Frankfurt
  { order: 6, startLat: 19.076, startLng: 72.877, endLat: 50.110, endLng: 8.682, arcAlt: 0.3, color: "#AC033B" },
  // Mumbai → Toronto
  { order: 7, startLat: 19.076, startLng: 72.877, endLat: 43.653, endLng: -79.383, arcAlt: 0.45, color: "#AC033B" },
  // Mumbai → Nairobi
  { order: 8, startLat: 19.076, startLng: 72.877, endLat: -1.286, endLng: 36.817, arcAlt: 0.2, color: "#AC033B" },
  // Mumbai → Riyadh
  { order: 9, startLat: 19.076, startLng: 72.877, endLat: 24.688, endLng: 46.724, arcAlt: 0.12, color: "#AC033B" },
  // Mumbai → Amsterdam
  { order: 10, startLat: 19.076, startLng: 72.877, endLat: 52.377, endLng: 4.907, arcAlt: 0.28, color: "#AC033B" },
  // Mumbai → Tokyo
  { order: 11, startLat: 19.076, startLng: 72.877, endLat: 35.681, endLng: 139.767, arcAlt: 0.22, color: "#AC033B" },
  // Mumbai → Los Angeles
  { order: 12, startLat: 19.076, startLng: 72.877, endLat: 34.052, endLng: -118.244, arcAlt: 0.42, color: "#AC033B" },
  // Mumbai → Johannesburg
  { order: 13, startLat: 19.076, startLng: 72.877, endLat: -26.204, endLng: 28.047, arcAlt: 0.22, color: "#AC033B" },
  // Mumbai → Paris
  { order: 14, startLat: 19.076, startLng: 72.877, endLat: 48.856, endLng: 2.352, arcAlt: 0.28, color: "#AC033B" },
];

export function GlobeDemo() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{
        position: "absolute",
        bottom: 0,
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}>
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
      {/* Fade bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background: "linear-gradient(to bottom, transparent, #ffffff)",
        zIndex: 20,
        pointerEvents: "none",
      }} />
    </div>
  );
}
