'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import the CodePlayground component with no SSR
// This is necessary because Three.js requires browser APIs
const CodePlayground = dynamic(
  () => import('@/components/CodePlayground'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading Playground...</div>
      </div>
    )
  }
);

export default function PlaygroundPage() {
  return <CodePlayground />;
}
