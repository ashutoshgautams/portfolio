'use client';

import { create } from 'zustand';
import { UserProfile, CodeBlock, Connection, ThemeConfig } from '@/types';

interface AppState {
  // User profile state
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  
  // Theme state
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themeConfig: ThemeConfig;
  setThemeConfig: (config: Partial<ThemeConfig>) => void;
  
  // 3D Code Playground state
  codeBlocks: CodeBlock[];
  connections: Connection[];
  selectedBlockId: string | null;
  
  // Code Playground actions
  addCodeBlock: (type: CodeBlock['type'], position?: [number, number, number]) => void;
  updateCodeBlock: (id: string, data: Partial<CodeBlock>) => void;
  removeCodeBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  connectBlocks: (sourceId: string, targetId: string) => void;
  removeConnection: (sourceId: string, targetId: string) => void;
  executeCode: () => { result: any; error: string | null };
  resetPlayground: () => void;
}

const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#3b82f6',
  secondaryColor: '#10b981',
  backgroundColor: '#0f172a',
  textColor: '#f1f5f9',
  fontFamily: 'Inter, sans-serif',
};

// Generate a unique ID
const generateId = () => `id-${Math.random().toString(36).slice(2, 11)}`;

// Get default code for a block type
const getDefaultCodeForType = (type: CodeBlock['type']): string => {
  switch (type) {
    case 'variable': return 'let x = 10;';
    case 'function': return 'function add(a, b) { return a + b; }';
    case 'loop': return 'for (let i = 0; i < 5; i++) { console.log(i); }';
    case 'conditional': return 'if (true) { console.log("Condition met"); }';
  }
};

// Get default color for a block type
const getDefaultColorForType = (type: CodeBlock['type']): string => {
  switch (type) {
    case 'variable': return '#3b82f6'; // blue
    case 'function': return '#10b981'; // green
    case 'loop': return '#8b5cf6'; // purple
    case 'conditional': return '#f59e0b'; // amber
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  // User profile initial state
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  
  // Theme initial state
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  themeConfig: DEFAULT_THEME,
  setThemeConfig: (config) => set((state) => ({ 
    themeConfig: { ...state.themeConfig, ...config } 
  })),
  
  // 3D Code Playground initial state
  codeBlocks: [],
  connections: [],
  selectedBlockId: null,
  
  // Code Playground actions
  addCodeBlock: (type, position = [0, 0, 0]) => {
    const newBlock: CodeBlock = {
      id: generateId(),
      type,
      position,
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      connections: [],
      code: getDefaultCodeForType(type),
      color: getDefaultColorForType(type),
    };
    
    set((state) => ({
      codeBlocks: [...state.codeBlocks, newBlock],
      selectedBlockId: newBlock.id,
    }));
  },
  
  updateCodeBlock: (id, data) => {
    set((state) => ({
      codeBlocks: state.codeBlocks.map((block) => 
        block.id === id ? { ...block, ...data } : block
      ),
    }));
  },
  
  removeCodeBlock: (id) => {
    // First, remove all connections related to this block
    set((state) => ({
      connections: state.connections.filter(
        (conn) => conn.sourceId !== id && conn.targetId !== id
      ),
      codeBlocks: state.codeBlocks.filter((block) => block.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    }));
  },
  
  selectBlock: (id) => {
    set({ selectedBlockId: id });
  },
  
  connectBlocks: (sourceId, targetId) => {
    // Don't connect if already connected or if connecting to self
    if (sourceId === targetId) return;
    
    const connections = get().connections;
    const connectionExists = connections.some(
      (conn) => conn.sourceId === sourceId && conn.targetId === targetId
    );
    
    if (connectionExists) return;
    
    const sourceBlock = get().codeBlocks.find((block) => block.id === sourceId);
    const targetBlock = get().codeBlocks.find((block) => block.id === targetId);
    
    if (!sourceBlock || !targetBlock) return;
    
    const newConnection: Connection = {
      id: generateId(),
      sourceId,
      targetId,
      points: [sourceBlock.position, targetBlock.position],
    };
    
    set((state) => ({
      connections: [...state.connections, newConnection],
    }));
  },
  
  removeConnection: (sourceId, targetId) => {
    set((state) => ({
      connections: state.connections.filter(
        (conn) => !(conn.sourceId === sourceId && conn.targetId === targetId)
      ),
    }));
  },
  
  executeCode: () => {
    const blocks = get().codeBlocks;
    const connections = get().connections;
    
    // Here you'd implement the algorithm to convert blocks and connections to executable code
    // This is a simplified version for now
    try {
      const codeString = blocks.map((block) => block.code).join('\n\n');
      // This is potentially unsafe for production - consider using a sandboxed env
      const result = new Function(`
        let __result;
        ${codeString}
        return __result;
      `)();
      
      return { result, error: null };
    } catch (error) {
      return { 
        result: null, 
        error: error instanceof Error ? error.message : String(error)
      };
    }
  },
  
  resetPlayground: () => {
    set({
      codeBlocks: [],
      connections: [],
      selectedBlockId: null,
    });
  },
}));
