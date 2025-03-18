'use client';

import React, { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
import { CodeBlock as CodeBlockType } from '@/types';
import { useDraggable } from '@/hooks/use3D';
import { useAppStore } from '@/lib/store';
import { getGeometryForBlockType, ColorUtils } from '@/lib/three-utils';
import * as THREE from 'three';

interface CodeBlockProps {
  block: CodeBlockType;
  onConnect?: (id: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ block, onConnect }) => {
  const { mesh, isDragging, isSelected, handleClick, bind } = useDraggable(
    block.id,
    block.position
  );
  
  const [hovered, setHovered] = useState(false);
  const updateCodeBlock = useAppStore((state) => state.updateCodeBlock);
  const removeCodeBlock = useAppStore((state) => state.removeCodeBlock);
  
  // Handle hover state
  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  // Handle connection
  const handleConnect = (e: THREE.Event) => {
    e.stopPropagation();
    if (onConnect) {
      onConnect(block.id);
    }
  };
  
  // Handle deletion
  const handleDelete = (e: THREE.Event) => {
    e.stopPropagation();
    removeCodeBlock(block.id);
  };
  
  // Get color based on state
  const getColor = () => {
    if (isSelected) return ColorUtils.lighten(block.color, 0.2);
    if (hovered) return ColorUtils.lighten(block.color, 0.1);
    return block.color;
  };
  
  // Render different geometry based on block type
  const renderGeometry = () => {
    const type = getGeometryForBlockType(block.type);
    
    switch (type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case 'cone':
        return <coneGeometry args={[0.7, 1.5, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };
  
  return (
    <group position={block.position}>
      <mesh
        ref={mesh}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onDoubleClick={handleConnect}
        onContextMenu={handleDelete}
        {...bind()}
      >
        {renderGeometry()}
        <meshStandardMaterial 
          color={getColor()} 
          roughness={0.7}
          metalness={0.3}
          emissive={isSelected ? getColor() : '#000000'} 
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>
      
      {/* Label for the block */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {block.type}
      </Text>
      
      {/* Visual indicator for selection */}
      {isSelected && (
        <mesh position={[0, 0, 0]} scale={1.1}>
          {renderGeometry()}
          <meshBasicMaterial 
            color={ColorUtils.lighten(block.color, 0.3)} 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      )}
    </group>
  );
};

export default CodeBlock;
