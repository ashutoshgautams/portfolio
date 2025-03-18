import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGesture } from '@use-gesture/react';
import { useAppStore } from '@/lib/store';

// Hook for draggable 3D objects
export const useDraggable = (
  id: string, 
  initialPosition: [number, number, number] = [0, 0, 0],
  onDragEnd?: (position: [number, number, number]) => void
) => {
  const { camera } = useThree();
  const mesh = useRef<THREE.Mesh>(null!);
  const updateCodeBlock = useAppStore((state) => state.updateCodeBlock);
  const selectedBlockId = useAppStore((state) => state.selectedBlockId);
  const selectBlock = useAppStore((state) => state.selectBlock);
  
  // Plane for consistent dragging
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const intersection = useRef(new THREE.Vector3());
  
  // State to track if the object is being dragged
  const [isDragging, setIsDragging] = useState(false);
  
  // Update position in the store - only on initial mount
  useEffect(() => {
    if (mesh.current) {
      // Only set position if different from current position
      const currentPos = [
        mesh.current.position.x,
        mesh.current.position.y,
        mesh.current.position.z
      ] as [number, number, number];
      
      if (JSON.stringify(currentPos) !== JSON.stringify(initialPosition)) {
        mesh.current.position.set(...initialPosition);
      }
    }
  }, []);
  
  // Set initial position
  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.set(...initialPosition);
    }
  }, [initialPosition]);
  
  // Handle selection
  const handleClick = (e: any) => {
    e.stopPropagation();
    selectBlock(id);
  };
  
  // Handle drag bindings
  const bind = useGesture({
    onDrag: ({ event, active, xy }) => {
      if (!mesh.current) return;
      
      if (event) event.stopPropagation();
      setIsDragging(active);
      
      if (active) {
        // Get the mouse position in normalized device coordinates
        // Use xy from gesture state which works with all event types
        const canvas = document.querySelector('canvas');
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((xy[0] - rect.left) / rect.width) * 2 - 1,
          -((xy[1] - rect.top) / rect.height) * 2 + 1
        );
        
        // Raycaster for mouse position
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersection with drag plane
        raycaster.ray.intersectPlane(dragPlane.current, intersection.current);
        
        // Update mesh position
        mesh.current.position.copy(intersection.current);
        
        // Update in store during drag
        updateCodeBlock(id, { position: [
          mesh.current.position.x,
          mesh.current.position.y,
          mesh.current.position.z
        ]});
      } else if (onDragEnd && mesh.current) {
        // Call onDragEnd when dragging stops
        onDragEnd([
          mesh.current.position.x,
          mesh.current.position.y,
          mesh.current.position.z
        ]);
      }
    }
  });
  
  // Highlight effect on selected objects
  useFrame(() => {
    if (!mesh.current) return;
    
    // Add subtle floating animation for selected block
    if (selectedBlockId === id) {
      mesh.current.position.y += Math.sin(Date.now() * 0.003) * 0.001;
      
      // Subtle rotation for selected block
      mesh.current.rotation.x += 0.003;
      mesh.current.rotation.y += 0.005;
    }
  });
  
  return {
    mesh,
    isDragging,
    isSelected: selectedBlockId === id,
    handleClick,
    bind
  };
};

// Hook for rotating camera around a point
export const useOrbitCamera = (
  target: [number, number, number] = [0, 0, 0],
  distance: number = 10,
  speed: number = 0.5
) => {
  const { camera } = useThree();
  const [isOrbiting, setIsOrbiting] = useState(false);
  
  // Set initial camera position
  useEffect(() => {
    camera.position.set(target[0], target[1], target[2] + distance);
    camera.lookAt(target[0], target[1], target[2]);
  }, [camera, target, distance]);
  
  // Handle animation frame
  useFrame(() => {
    if (!isOrbiting) return;
    
    const angle = Date.now() * 0.001 * speed;
    const x = target[0] + Math.sin(angle) * distance;
    const z = target[2] + Math.cos(angle) * distance;
    
    camera.position.set(x, camera.position.y, z);
    camera.lookAt(target[0], target[1], target[2]);
  });
  
  return {
    startOrbiting: () => setIsOrbiting(true),
    stopOrbiting: () => setIsOrbiting(false),
    isOrbiting
  };
};

// Hook for animated floating effect
export const useFloatingAnimation = (
  amplitude: number = 0.1,
  speed: number = 1
) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const initialY = useRef<number>(0);
  
  // Save initial Y position
  useEffect(() => {
    if (mesh.current) {
      initialY.current = mesh.current.position.y;
    }
  }, []);
  
  // Animate on each frame
  useFrame(() => {
    if (!mesh.current) return;
    
    const time = Date.now() * 0.001 * speed;
    mesh.current.position.y = initialY.current + Math.sin(time) * amplitude;
    
    // Add subtle rotation
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.002;
  });
  
  return { mesh };
};

// Hook for handling connections between nodes
export const useConnections = () => {
  const connections = useAppStore((state) => state.connections);
  const codeBlocks = useAppStore((state) => state.codeBlocks);
  const connectBlocks = useAppStore((state) => state.connectBlocks);
  const removeConnection = useAppStore((state) => state.removeConnection);
  
  // Create a connection between two blocks
  const createConnection = (sourceId: string, targetId: string) => {
    connectBlocks(sourceId, targetId);
  };
  
  // Remove a connection
  const deleteConnection = (sourceId: string, targetId: string) => {
    removeConnection(sourceId, targetId);
  };
  
  // Get all connections for a specific block
  const getConnectionsForBlock = (blockId: string) => {
    return connections.filter(
      (conn) => conn.sourceId === blockId || conn.targetId === blockId
    );
  };
  
  return {
    connections,
    createConnection,
    deleteConnection,
    getConnectionsForBlock
  };
};
