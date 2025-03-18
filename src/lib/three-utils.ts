'use client';

import * as THREE from 'three';
import { CodeBlock } from '@/types';

// Convert degrees to radians
export const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Generate a random position within boundaries
export const randomPosition = (
  xBounds: [number, number] = [-5, 5],
  yBounds: [number, number] = [-5, 5],
  zBounds: [number, number] = [-5, 5]
): [number, number, number] => {
  const x = Math.random() * (xBounds[1] - xBounds[0]) + xBounds[0];
  const y = Math.random() * (yBounds[1] - yBounds[0]) + yBounds[0];
  const z = Math.random() * (zBounds[1] - zBounds[0]) + zBounds[0];
  
  return [x, y, z];
};

// Create a curved line between two points
export const createCurvedLineBetweenPoints = (
  startPoint: [number, number, number],
  endPoint: [number, number, number],
  curveHeight: number = 1
): THREE.CatmullRomCurve3 => {
  const start = new THREE.Vector3(...startPoint);
  const end = new THREE.Vector3(...endPoint);
  
  // Calculate middle control point
  const midPoint = new THREE.Vector3(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2 + curveHeight,
    (start.z + end.z) / 2
  );
  
  // Create a curved path
  const curve = new THREE.CatmullRomCurve3([
    start,
    midPoint,
    end
  ]);
  
  return curve;
};

// Check if two 3D objects are colliding (simplified bounding box check)
export const checkCollision = (
  obj1Pos: [number, number, number],
  obj2Pos: [number, number, number],
  threshold: number = 1.5
): boolean => {
  const pos1 = new THREE.Vector3(...obj1Pos);
  const pos2 = new THREE.Vector3(...obj2Pos);
  
  return pos1.distanceTo(pos2) < threshold;
};

// Color utility to manipulate colors
export class ColorUtils {
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 0, g: 0, b: 0 };
  }
  
  static darken(hex: string, amount: number = 0.2): string {
    const { r, g, b } = this.hexToRgb(hex);
    const newR = Math.max(0, r - amount);
    const newG = Math.max(0, g - amount);
    const newB = Math.max(0, b - amount);
    
    return `#${Math.round(newR * 255).toString(16).padStart(2, '0')}${Math.round(newG * 255).toString(16).padStart(2, '0')}${Math.round(newB * 255).toString(16).padStart(2, '0')}`;
  }
  
  static lighten(hex: string, amount: number = 0.2): string {
    const { r, g, b } = this.hexToRgb(hex);
    const newR = Math.min(1, r + amount);
    const newG = Math.min(1, g + amount);
    const newB = Math.min(1, b + amount);
    
    return `#${Math.round(newR * 255).toString(16).padStart(2, '0')}${Math.round(newG * 255).toString(16).padStart(2, '0')}${Math.round(newB * 255).toString(16).padStart(2, '0')}`;
  }
}

// Generate code from block type
export const generateCodeFromBlockType = (block: CodeBlock): string => {
  const { type } = block;
  
  switch (type) {
    case 'variable':
      return `const variable${Math.floor(Math.random() * 1000)} = ${Math.floor(Math.random() * 100)};`;
    case 'function':
      return `function function${Math.floor(Math.random() * 1000)}(a, b) {\n  return a + b;\n}`;
    case 'loop':
      return `for (let i = 0; i < 10; i++) {\n  console.log(i);\n}`;
    case 'conditional':
      return `if (Math.random() > 0.5) {\n  console.log("True!");\n} else {\n  console.log("False!");\n}`;
    default:
      return '// Unknown block type';
  }
};

// Get a geometry based on block type
export const getGeometryForBlockType = (type: CodeBlock['type']): string => {
  switch (type) {
    case 'variable': return 'box';
    case 'function': return 'sphere';
    case 'loop': return 'torus';
    case 'conditional': return 'cone';
    default: return 'box';
  }
};
