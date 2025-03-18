'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/lib/store';
import { CodeBlock as CodeBlockType } from '@/types';
import { randomPosition } from '@/lib/three-utils';

// Dynamically import the Scene component with no SSR
const Scene = dynamic(() => import('./3d/Scene'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-xl">Loading 3D scene...</div>
    </div>
  )
});

const CodePlayground: React.FC = () => {
  const [codeOutput, setCodeOutput] = useState<{ result: any; error: string | null }>({
    result: null,
    error: null
  });
  
  const {
    codeBlocks,
    addCodeBlock,
    updateCodeBlock,
    removeCodeBlock,
    selectedBlockId,
    executeCode,
    resetPlayground
  } = useAppStore(state => ({
    codeBlocks: state.codeBlocks,
    addCodeBlock: state.addCodeBlock,
    updateCodeBlock: state.updateCodeBlock,
    removeCodeBlock: state.removeCodeBlock,
    selectedBlockId: state.selectedBlockId,
    executeCode: state.executeCode,
    resetPlayground: state.resetPlayground
  }));
  
  // Get the currently selected block
  const selectedBlock = codeBlocks.find(block => block.id === selectedBlockId);
  
  // Handle adding a new code block
  const handleAddBlock = (type: CodeBlockType['type']) => {
    addCodeBlock(type, randomPosition([-5, 5], [-2, 2], [-2, 2]));
  };
  
  // Handle executing the code
  const handleExecuteCode = () => {
    const result = executeCode();
    setCodeOutput(result);
  };
  
  // Handle updating the code for a selected block
  const handleCodeChange = (code: string) => {
    if (selectedBlockId) {
      updateCodeBlock(selectedBlockId, { code });
    }
  };
  
  // Handle resetting the playground
  const handleReset = () => {
    if (confirm('Are you sure you want to reset the playground? All blocks will be removed.')) {
      resetPlayground();
      setCodeOutput({ result: null, error: null });
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Code in 3D Playground</h1>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            onClick={handleExecuteCode}
          >
            Execute Code
          </button>
          <button
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-64 bg-gray-800 p-4 flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Add Blocks</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleAddBlock('variable')}
            >
              Variable
            </button>
            <button
              className="p-2 bg-green-500 rounded hover:bg-green-600 transition-colors"
              onClick={() => handleAddBlock('function')}
            >
              Function
            </button>
            <button
              className="p-2 bg-purple-500 rounded hover:bg-purple-600 transition-colors"
              onClick={() => handleAddBlock('loop')}
            >
              Loop
            </button>
            <button
              className="p-2 bg-yellow-500 rounded hover:bg-yellow-600 transition-colors"
              onClick={() => handleAddBlock('conditional')}
            >
              Conditional
            </button>
          </div>
          
          <div className="flex-1 mt-4">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <ul className="mt-2 text-sm text-gray-300 space-y-2">
              <li>• Click and drag to move blocks</li>
              <li>• Double-click a block to create a connection</li>
              <li>• Right-click a block to delete it</li>
              <li>• Click a connection to delete it</li>
              <li>• Edit code in the editor on the right</li>
            </ul>
          </div>
          
          <div className="mt-auto text-xs text-gray-400">
            <p>Tip: Use the scroll wheel to zoom in and out</p>
            <p>Drag with right mouse button to rotate the view</p>
          </div>
        </div>
        
        {/* Main 3D View */}
        <div className="flex-1 relative">
          <Scene onBlockSelect={(id) => console.log(`Block selected: ${id}`)} />
        </div>
        
        {/* Right sidebar */}
        <div className="w-96 bg-gray-800 p-4 flex flex-col">
          <h2 className="text-xl font-semibold">
            {selectedBlock ? `Editing ${selectedBlock.type}` : 'Code Editor'}
          </h2>
          
          {selectedBlock ? (
            <textarea
              className="flex-1 mt-2 p-2 bg-gray-900 text-white font-mono rounded"
              value={selectedBlock.code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="Write your code here..."
            />
          ) : (
            <div className="flex-1 mt-2 p-2 bg-gray-900 text-gray-500 rounded flex items-center justify-center">
              Select a block to edit its code
            </div>
          )}
          
          {/* Output Console */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Console Output</h2>
            <div className="mt-2 p-2 bg-black rounded h-48 overflow-auto font-mono">
              {codeOutput.error ? (
                <div className="text-red-500">
                  Error: {codeOutput.error}
                </div>
              ) : codeOutput.result !== null ? (
                <div className="text-green-400">
                  {typeof codeOutput.result === 'object'
                    ? JSON.stringify(codeOutput.result, null, 2)
                    : String(codeOutput.result)}
                </div>
              ) : (
                <div className="text-gray-500">
                  Execute code to see output here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
