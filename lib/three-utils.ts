import * as THREE from 'three';

/**
 * Dispose a Three.js object and all its children recursively.
 * Call on unmount to prevent memory leaks.
 */
export function disposeObject(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(disposeMaterial);
        } else {
          disposeMaterial(child.material);
        }
      }
    }
  });
}

function disposeMaterial(material: THREE.Material) {
  material.dispose();
  // Dispose textures
  const mat = material as THREE.MeshStandardMaterial;
  if (mat.map) mat.map.dispose();
  if (mat.normalMap) mat.normalMap.dispose();
  if (mat.roughnessMap) mat.roughnessMap.dispose();
  if (mat.metalnessMap) mat.metalnessMap.dispose();
  if (mat.emissiveMap) mat.emissiveMap.dispose();
  if (mat.aoMap) mat.aoMap.dispose();
}

/**
 * Detect GPU performance tier based on WebGL renderer info.
 * Returns 'high', 'medium', or 'low'.
 */
export function detectGPUTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'low';

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return 'low';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'medium';

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

    // Check for known high-end GPUs
    const highEnd = /nvidia|radeon|geforce|rtx|gtx|rx\s?[5-9]/i;
    const lowEnd = /intel|mesa|swiftshader|llvmpipe|software/i;
    const apple = /apple\s?gpu|apple\s?m[1-9]/i;

    if (highEnd.test(renderer) || highEnd.test(vendor)) return 'high';
    if (apple.test(renderer)) return 'high'; // Apple Silicon is capable
    if (lowEnd.test(renderer)) return 'low';

    return 'medium';
  } catch {
    return 'medium';
  }
}

/**
 * Generate random positions for N particles in a sphere.
 */
export function generateSpherePositions(
  count: number,
  radius: number
): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

/**
 * Convert lat/lng to 3D coordinates on a sphere.
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Create a curved arc between two points on a sphere (for ExportGlobe).
 */
export function createArcCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  altitude: number = 0.3
): THREE.QuadraticBezierCurve3 {
  const midPoint = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  midPoint.normalize().multiplyScalar(start.length() + altitude);

  return new THREE.QuadraticBezierCurve3(start, midPoint, end);
}

/**
 * Crimson color constant for Three.js scenes.
 */
export const CRIMSON_THREE = new THREE.Color('#AC033B');
export const WHITE_THREE = new THREE.Color('#FFFFFF');
