'use client';

import React, { useMemo, useRef } from 'react';
import { Line, QuadraticBezierLine } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Connection as ConnectionType } from '@/types';
import { useAppStore } from '@/lib/store';
import { createCurvedLineBetweenPoints } from '@/lib/three-utils';

interface ConnectionProps {
  connection: ConnectionType;
  selected?: boolean;
  onDelete?: () => void;
}

const Connection: React.FC<ConnectionProps> = ({ 
  connection, 
  selected = false,
  onDelete 
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const { sourceId, targetId } = connection;
  
  // Get the latest positions from the store
  const codeBlocks = useAppStore(state => state.codeBlocks);
  const sourceBlock = codeBlocks.find(block => block.id === sourceId);
  const targetBlock = codeBlocks.find(block => block.id === targetId);
  
  // Skip rendering if blocks don't exist
  if (!sourceBlock || !targetBlock) return null;
  
  // Create points for curved line
  const start = sourceBlock.position;
  const end = targetBlock.position;
  
  // Calculate a nice curve height based on distance
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2) + 
    Math.pow(end[2] - start[2], 2)
  );
  
  const curveHeight = Math.min(distance * 0.5, 2);
  
  // Handle hover effects
  const [hovered, setHovered] = React.useState(false);
  
  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  // Handle deletion
  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };
  
  // Animation for selected or hovered connections
  useFrame(() => {
    if (!lineRef.current) return;
    
    if (selected || hovered) {
      // Pulse animation for selected/hovered connections
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time * 5) * 0.5 + 1;
      
      if (lineRef.current.material instanceof THREE.LineBasicMaterial) {
        lineRef.current.material.color = new THREE.Color(
          hovered ? '#ff9500' : '#ffffff'
        );
        lineRef.current.material.opacity = pulse;
      }
    }
  });
  
  return (
    <group>
      {/* Main connection line */}
      <QuadraticBezierLine
        ref={lineRef}
        start={start}
        end={end}
        mid={[
          (start[0] + end[0]) / 2,
          (start[1] + end[1]) / 2 + curveHeight,
          (start[2] + end[2]) / 2
        ]}
        color={hovered ? '#ff9500' : (selected ? '#ffffff' : '#aaaaaa')}
        lineWidth={selected || hovered ? 2 : 1}
        dashed={selected}
        dashSize={0.2}
        gapSize={0.1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
      
      {/* Direction arrow */}
      <group position={end}>
        <mesh 
          scale={0.1}
          rotation={[0, 0, Math.atan2(end[1] - start[1], end[0] - start[0]) + Math.PI / 2]}
        >
          <coneGeometry args={[1, 2, 8]} />
          <meshBasicMaterial color={hovered ? '#ff9500' : (selected ? '#ffffff' : '#aaaaaa')} />
        </mesh>
      </group>
    </group>
  );
};

export default Connection;
