'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Stars, Text, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useFloatingAnimation } from '@/hooks/use3D';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Animated 3D text component
const AnimatedText3D: React.FC<{ text: string; position: [number, number, number]; fontSize?: number }> = ({ 
  text, 
  position, 
  fontSize = 0.5 
}) => {
  const { mesh } = useFloatingAnimation(0.2, 0.5);
  
  return (
    <group position={position} ref={mesh}>
      <Text
        color="#ffffff"
        fontSize={fontSize}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  );
};

// Floating 3D box component
const FloatingBox: React.FC<{ position: [number, number, number]; color: string; size?: number }> = ({ 
  position, 
  color, 
  size = 1 
}) => {
  const { mesh } = useFloatingAnimation(0.3, Math.random() * 0.5 + 0.5);
  
  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Home page component
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Prevent SSR issues with Three.js
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading...</div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          <color attach="background" args={['#050816']} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* 3D Title */}
          <AnimatedText3D 
            text="CODE IN 3D"
            position={[0, 2, 0]}
            fontSize={1.5}
          />
          
          {/* Subtitle */}
          <AnimatedText3D 
            text="Interactive Developer Playground"
            position={[0, 0.5, 0]}
            fontSize={0.5}
          />
          
          {/* Decorative floating boxes */}
          <FloatingBox position={[-4, 2, -5]} color="#3b82f6" size={0.8} />
          <FloatingBox position={[5, -1, -3]} color="#10b981" size={1.2} />
          <FloatingBox position={[-3, -2, -6]} color="#8b5cf6" size={1} />
          <FloatingBox position={[4, 3, -4]} color="#f59e0b" size={0.7} />
          <FloatingBox position={[0, -3, -5]} color="#ef4444" size={0.9} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} intensity={0.8} levels={9} mipmapBlur />
            <Vignette offset={0.5} darkness={0.5} eskil={false} />
          </EffectComposer>
        </Canvas>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 gradient-text">
            CODE IN 3D
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-blue-200">
            Visualize and interact with code in a 3D environment
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 md:space-y-0 md:space-x-4 md:flex"
        >
          <Link href="/playground">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-bold shadow-lg transition-all hover:shadow-blue-500/30 hover:shadow-xl">
              Launch Playground
            </button>
          </Link>
          
          <Link href="/about">
            <button className="px-8 py-4 bg-transparent border-2 border-blue-500 hover:bg-blue-900/20 rounded-lg text-lg font-bold shadow-lg transition-all">
              Learn More
            </button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 text-sm text-gray-400"
        >
          <p>Built with Next.js, TypeScript, and Three.js</p>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
