'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { UserProfile } from '@/types';

// Dynamically import the 3D components with no SSR
const DynamicScene = dynamic(
  () => import('@/components/3d/Scene'),
  { ssr: false }
);

// Mock data for user profile
const MOCK_PROFILES: Record<string, UserProfile> = {
  'ashutosh': {
    username: 'ashutosh',
    name: 'Ashutosh Gautam',
    title: 'Full Stack Developer & 3D Enthusiast',
    bio: 'Building innovative web experiences with a focus on 3D visualization and interactive experiences.',
    socialLinks: {
      github: 'https://github.com/ashutosh',
      twitter: 'https://twitter.com/ashutosh',
      linkedin: 'https://linkedin.com/in/ashutosh',
    },
    skills: ['React', 'Three.js', 'Next.js', 'TypeScript', 'Node.js', 'WebGL'],
    projects: [
      {
        id: '1',
        title: 'Code in 3D',
        description: 'Interactive 3D code visualization platform',
        tags: ['Three.js', 'Next.js', 'React'],
        image: '/images/code-in-3d.jpg',
        demoUrl: '/playground',
        githubUrl: 'https://github.com/ashutosh/code-in-3d',
        featured: true,
      }
    ],
    experiences: [
      {
        id: '1',
        company: 'TechCorp',
        position: 'Senior Frontend Developer',
        startDate: '2020-01',
        description: 'Developing interactive 3D web experiences',
        technologies: ['React', 'Three.js', 'WebGL'],
      }
    ]
  },
  // Add more mock profiles as needed
};

export default function UserPortfolioPage() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const username = pathname?.split('/')[1] || '';
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
    
    // In a real app, this would be an API call
    // For now, we use mock data
    const fetchUserProfile = () => {
      setLoading(true);
      
      setTimeout(() => {
        const profile = MOCK_PROFILES[username];
        
        if (profile) {
          setUserProfile(profile);
          setError(null);
        } else {
          setUserProfile(null);
          setError('User profile not found');
        }
        
        setLoading(false);
      }, 1000); // Simulate network delay
    };
    
    if (username) {
      fetchUserProfile();
    }
  }, [username]);
  
  if (!isMounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading...</div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading profile...</div>
      </div>
    );
  }
  
  if (error || !userProfile) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-red-500 mb-4">
          {error || 'Something went wrong'}
        </div>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            Return to Home
          </button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 3D Hero Section */}
      <div className="h-screen relative">
        <div className="absolute inset-0">
          <DynamicScene />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              {userProfile.name}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-blue-200">
              {userProfile.title}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex space-x-4"
          >
            {userProfile.socialLinks.github && (
              <a 
                href={userProfile.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
            )}
            {userProfile.socialLinks.twitter && (
              <a 
                href={userProfile.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                Twitter
              </a>
            )}
            {userProfile.socialLinks.linkedin && (
              <a 
                href={userProfile.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
            )}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="animate-bounce">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* About Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 gradient-text">About Me</h2>
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <p className="text-lg leading-relaxed">{userProfile.bio}</p>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 gradient-text">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userProfile.projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-3xl font-bold text-gray-600">{project.title[0]}</div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 gradient-text">Experience</h2>
        <div className="space-y-8">
          {userProfile.experiences.map((experience) => (
            <div key={experience.id} className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-1">{experience.position}</h3>
              <h4 className="text-lg text-blue-400 mb-4">{experience.company}</h4>
              
              <p className="text-gray-400 mb-2">
                {experience.startDate} - {experience.endDate || 'Present'}
              </p>
              
              <p className="text-gray-300 mb-4">{experience.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-700 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 gradient-text">Get In Touch</h2>
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <p className="text-lg mb-8">
            Interested in working together? Feel free to reach out through any of the channels below.
          </p>
          
          <div className="flex flex-wrap gap-4">
            {userProfile.socialLinks.github && (
              <a 
                href={userProfile.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                GitHub
              </a>
            )}
            {userProfile.socialLinks.twitter && (
              <a 
                href={userProfile.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Twitter
              </a>
            )}
            {userProfile.socialLinks.linkedin && (
              <a 
                href={userProfile.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {userProfile.name} - Built with Code in 3D
          </p>
          
          <div className="mt-4">
            <Link href="/">
              <span className="text-blue-400 hover:text-blue-300 transition-colors">
                Create your own 3D portfolio →
              </span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
