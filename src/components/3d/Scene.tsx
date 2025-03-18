'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Stars,
  Text,
  Grid,
  Loader
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useAppStore } from '@/lib/store';
import CodeBlock from './CodeBlock';
import Connection from './Connection';
import { randomPosition } from '@/lib/three-utils';

interface SceneProps {
  onBlockSelect?: (id: string) => void;
}

// Main scene component
const Scene: React.FC<SceneProps> = ({ onBlockSelect }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <SceneContent onBlockSelect={onBlockSelect} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={0.5} levels={9} mipmapBlur />
          <Vignette offset={0.5} darkness={0.5} eskil={false} />
        </EffectComposer>
      </Canvas>
      <Loader />
    </div>
  );
};

// Separate component for the scene content
const SceneContent: React.FC<SceneProps> = ({ onBlockSelect }) => {
  const { 
    codeBlocks, 
    connections, 
    selectedBlockId,
    selectBlock,
    removeConnection
  } = useAppStore(state => ({
    codeBlocks: state.codeBlocks,
    connections: state.connections,
    selectedBlockId: state.selectedBlockId,
    selectBlock: state.selectBlock,
    removeConnection: state.removeConnection
  }));
  
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  
  // Handle connecting blocks
  const handleConnect = (id: string) => {
    if (connectingFrom) {
      // Don't connect to self
      if (connectingFrom !== id) {
        useAppStore.getState().connectBlocks(connectingFrom, id);
      }
      setConnectingFrom(null);
    } else {
      setConnectingFrom(id);
      if (onBlockSelect) {
        onBlockSelect(id);
      }
    }
  };
  
  // Handle deletion of connection
  const handleDeleteConnection = (sourceId: string, targetId: string) => {
    removeConnection(sourceId, targetId);
  };
  
  // Handle background click (deselect)
  const handleBackgroundClick = () => {
    selectBlock(null);
    setConnectingFrom(null);
  };
  
  return (
    <>
      {/* Camera and controls */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
      />
      
      {/* Environment and lighting */}
      <color attach="background" args={['#050816']} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Grid for reference */}
      <Grid 
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6080ff"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#8080ff"
        position={[0, -2, 0]}
        fadeDistance={30}
        fadeStrength={1}
        infiniteGrid
      />
      
      {/* Invisible plane for background clicks */}
      <mesh position={[0, 0, -10]} onClick={handleBackgroundClick}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Render all code blocks */}
      <group>
        {codeBlocks.map((block) => (
          <CodeBlock 
            key={block.id} 
            block={block} 
            onConnect={handleConnect} 
          />
        ))}
      </group>
      
      {/* Render all connections */}
      <group>
        {connections.map((connection) => (
          <Connection 
            key={`${connection.sourceId}-${connection.targetId}`}
            connection={connection}
            selected={connection.sourceId === selectedBlockId || connection.targetId === selectedBlockId}
            onDelete={() => handleDeleteConnection(connection.sourceId, connection.targetId)}
          />
        ))}
      </group>
      
      {/* Show connecting state if active */}
      {connectingFrom && (
        <group>
          <Text
            position={[0, 3, 0]}
            fontSize={0.5}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            Select a target block to connect
          </Text>
        </group>
      )}
    </>
  );
};

export default Scene;
