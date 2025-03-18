// User profile types
export interface UserProfile {
    username: string;
    name: string;
    title: string;
    bio: string;
    avatar?: string;
    socialLinks: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
    skills: string[];
    projects: Project[];
    experiences: Experience[];
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    demoUrl?: string;
    githubUrl?: string;
    featured: boolean;
  }
  
  export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
    technologies: string[];
  }
  
  // 3D Code Playground types
  export interface CodeBlock {
    id: string;
    type: 'variable' | 'function' | 'loop' | 'conditional';
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    connections: string[];
    code: string;
    color: string;
  }
  
  export interface ThreeScene {
    blocks: CodeBlock[];
    connections: Connection[];
  }
  
  export interface Connection {
    id: string;
    sourceId: string;
    targetId: string;
    points: [number, number, number][];
  }
  
  // Theme configuration
  export interface ThemeConfig {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  }
  