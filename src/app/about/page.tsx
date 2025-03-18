'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold gradient-text">Code in 3D</h1>
          </Link>
          
          <nav className="flex space-x-4">
            <Link href="/">
              <span className="text-gray-300 hover:text-white transition-colors">Home</span>
            </Link>
            <Link href="/about">
              <span className="text-white font-medium">About</span>
            </Link>
            <Link href="/playground">
              <span className="text-gray-300 hover:text-white transition-colors">Playground</span>
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Code in 3D
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A unique interactive 3D portfolio website and developer playground for visualizing code in three dimensions.
          </motion.p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Code in 3D?</h2>
            <p className="text-gray-300 mb-4">
              Code in 3D is an innovative platform that combines a portfolio website with an interactive 3D code visualization playground. It allows developers to create unique portfolio experiences while providing a fun and intuitive way to visualize code execution.
            </p>
            <p className="text-gray-300">
              Built with Next.js, TypeScript, and Three.js, this platform aims to revolutionize how we think about and interact with code, making programming more accessible and engaging.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• Interactive 3D code visualization</li>
                <li>• Drag & drop JavaScript function blocks</li>
                <li>• Real-time code execution</li>
                <li>• Custom 3D portfolio generator</li>
                <li>• Dynamic user profiles</li>
                <li>• Stunning visual effects</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• Next.js for server-rendered React</li>
                <li>• TypeScript for type safety</li>
                <li>• Three.js for 3D rendering</li>
                <li>• React Three Fiber for React integration</li>
                <li>• Zustand for state management</li>
                <li>• Framer Motion for animations</li>
                <li>• Tailwind CSS for styling</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use the Playground</h2>
            <p className="text-gray-300 mb-4">
              The Code in 3D playground allows you to visualize and interact with JavaScript code in a 3D environment:
            </p>
            <ol className="space-y-2 text-gray-300 list-decimal pl-5">
              <li>Add code blocks (variables, functions, loops, conditionals) to the 3D space</li>
              <li>Connect blocks to represent code flow and dependencies</li>
              <li>Edit the code within each block</li>
              <li>Execute the code and see the results in real-time</li>
              <li>Create complex code structures with an intuitive visual interface</li>
            </ol>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Future Plans</h2>
            <p className="text-gray-300 mb-4">
              We're constantly working to improve Code in 3D with new features and capabilities:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• AI-powered code assistance and suggestions</li>
              <li>• Interactive 3D coding challenges and puzzles</li>
              <li>• VR/AR integration for immersive coding experiences</li>
              <li>• Community features for sharing creations</li>
              <li>• Advanced 3D portfolio templates</li>
              <li>• Support for additional programming languages</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Code in 3D?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Jump into our interactive playground or create your own 3D portfolio today!
          </p>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/playground">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-bold shadow-lg transition-all hover:shadow-blue-500/30 hover:shadow-xl">
                Try the Playground
              </button>
            </Link>
            
            <Link href="/ashutosh">
              <button className="px-8 py-4 bg-transparent border-2 border-blue-500 hover:bg-blue-900/20 rounded-lg text-lg font-bold shadow-lg transition-all">
                View Sample Portfolio
              </button>
            </Link>
                  </div>

                  {/* Footer */}
                  <Footer />

              </div>
          </section>
      </div>
  );
}
