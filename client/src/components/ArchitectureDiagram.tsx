import React from 'react';
import { stepNames, componentAnalysisData } from '@/data/architectureData';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface ArchitectureDiagramProps {
  currentStep: number;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ currentStep }) => {
  // Colors for different system components
  const colors = {
    1: { main: '#4299e1', gradient: 'linear-gradient(135deg, #4299e1, #63b3ed)' },
    2: { main: '#48bb78', gradient: 'linear-gradient(135deg, #48bb78, #68d391)' },
    3: { main: '#f6ad55', gradient: 'linear-gradient(135deg, #f6ad55, #fbd38d)' },
    4: { main: '#f687b3', gradient: 'linear-gradient(135deg, #f687b3, #f8b4d9)' },
    5: { main: '#9f7aea', gradient: 'linear-gradient(135deg, #9f7aea, #b794f4)' },
    6: { main: '#4fd1c5', gradient: 'linear-gradient(135deg, #4fd1c5, #76e4c8)' },
    7: { main: '#667eea', gradient: 'linear-gradient(135deg, #667eea, #7f9cf5)' },
    8: { main: '#ed8936', gradient: 'linear-gradient(135deg, #ed8936, #f6ad55)' },
    9: { main: '#38b2ac', gradient: 'linear-gradient(135deg, #38b2ac, #4fd1c5)' },
    10: { main: '#5a67d8', gradient: 'linear-gradient(135deg, #5a67d8, #667eea)' }
  };
  
  // Component labels
  const componentLabels = {
    1: "Space",
    2: "Boundary",
    3: "Forces", 
    4: "Purpose",
    5: "Structure",
    6: "Mechanism",
    7: "Parts",
    8: "Behavior",
    9: "I/O",
    10: "System"
  };
  
  const color = colors[currentStep as keyof typeof colors] || colors[1];
  
  // Get the analysis data for the current step
  const analysisData = componentAnalysisData[currentStep]?.metrics || [
    { name: 'Complexity', value: 65 },
    { name: 'Integration', value: 78 },
    { name: 'Flexibility', value: 42 }
  ];
  
  // Analysis caption
  const analysisCaption = componentAnalysisData[currentStep]?.caption || 
    `Impact analysis of ${stepNames[currentStep]} on overall system performance.`;

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-between">
      <div className="text-center md:w-1/2">
        <h3 className="text-lg font-semibold mb-4">
          <span className="py-1 px-3 rounded-full text-white" style={{ background: color.gradient }}>
            {stepNames[currentStep]}
          </span>
        </h3>
        
        {/* Visual representation - customized for each component */}
        <div className="w-80 h-80 bg-gradient-to-br from-gray-50 to-white rounded-full mx-auto relative shadow-lg">
          {/* Base visualization that's always present */}
          <div className="absolute inset-0 rounded-full border border-gray-200"></div>
          
          {/* SPACE - Component 1 */}
          {currentStep === 1 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Environment visualization */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-40"></div>
                {/* Cloud-like shapes */}
                <div className="absolute top-6 left-10 w-16 h-6 rounded-full bg-white opacity-60"></div>
                <div className="absolute top-4 left-14 w-14 h-6 rounded-full bg-white opacity-60"></div>
                <div className="absolute top-8 right-12 w-18 h-7 rounded-full bg-white opacity-60"></div>
                <div className="absolute bottom-12 left-20 w-12 h-5 rounded-full bg-white opacity-60"></div>
                {/* "Resources" in the environment */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-yellow-300 opacity-70 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-green-300 opacity-70 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-5 h-5 rounded-full bg-blue-300 opacity-70 animate-pulse"></div>
              </div>
              
              {/* Label */}
              <div className="bg-white/90 rounded-full px-4 py-2 shadow-md z-10">
                <span className="font-bold text-lg" style={{ color: color.main }}>Space</span>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  The operating environment
                </span>
              </div>
            </div>
          )}
          
          {/* BOUNDARY - Component 2 */}
          {currentStep === 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Well-defined boundary */}
              <div className="absolute inset-0 rounded-full border-8 border-green-400 opacity-60"></div>
              
              {/* Inner area (system) */}
              <div className="absolute inset-12 rounded-full bg-green-50 opacity-40"></div>
              
              {/* Outside elements trying to pass through boundary */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-10 bg-red-400 opacity-60 animate-bounce"></div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-10 bg-blue-400 opacity-60 animate-bounce"></div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-4 bg-yellow-400 opacity-60 animate-bounce"></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-4 bg-purple-400 opacity-60 animate-bounce"></div>
              
              {/* Boundary gates/filters */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-green-600 opacity-80"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-green-600 opacity-80"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-green-600 opacity-80"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-green-600 opacity-80"></div>
              
              {/* Label */}
              <div className="bg-white/90 rounded-full px-4 py-2 shadow-md z-10">
                <span className="font-bold text-lg" style={{ color: color.main }}>Boundary</span>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  Defines inside vs. outside
                </span>
              </div>
            </div>
          )}
          
          {/* FORCES - Component 3 */}
          {currentStep === 3 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central area being acted upon */}
              <div className="absolute inset-20 rounded-full bg-orange-50"></div>
              
              {/* Force arrows pointing inward */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 h-32 animate-pulse"
                  style={{ 
                    transform: `rotate(${i * 45}deg) translateX(100px)`,
                    transformOrigin: 'left center' 
                  }}
                >
                  {/* Force arrow */}
                  <div className="w-20 h-3 bg-gradient-to-r from-orange-500 to-orange-300 rounded-e-sm relative -translate-x-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-8 border-transparent border-l-orange-300"></div>
                  </div>
                </div>
              ))}
              
              {/* Label */}
              <div className="bg-white/90 rounded-full px-4 py-2 shadow-md z-10">
                <span className="font-bold text-lg" style={{ color: color.main }}>Forces</span>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  External influences
                </span>
              </div>
            </div>
          )}
          
          {/* PURPOSE - Component 4 */}
          {currentStep === 4 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Target rings */}
              <div className="absolute inset-8 rounded-full border-4 border-pink-200 opacity-80"></div>
              <div className="absolute inset-16 rounded-full border-4 border-pink-300 opacity-80"></div>
              <div className="absolute inset-24 rounded-full border-4 border-pink-400 opacity-80"></div>
              
              {/* Central purpose */}
              <div className="absolute inset-32 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Goal</span>
                </div>
              </div>
              
              {/* Direction arrows toward goal */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3 h-14 bg-pink-400 opacity-70">
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 border-6 border-transparent border-t-pink-400"></div>
              </div>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-3 h-14 bg-pink-400 opacity-70">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 border-6 border-transparent border-b-pink-400"></div>
              </div>
              <div className="absolute left-12 top-1/2 -translate-y-1/2 w-14 h-3 bg-pink-400 opacity-70">
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 border-6 border-transparent border-l-pink-400"></div>
              </div>
              <div className="absolute right-12 top-1/2 -translate-y-1/2 w-14 h-3 bg-pink-400 opacity-70">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 border-6 border-transparent border-r-pink-400"></div>
              </div>
              
              {/* Label */}
              <div className="absolute top-6 left-0 right-0 text-center">
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-md inline-block">
                  <span className="font-bold text-lg" style={{ color: color.main }}>Purpose</span>
                </div>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  Why the system exists
                </span>
              </div>
            </div>
          )}
          
          {/* STRUCTURE - Component 5 */}
          {currentStep === 5 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Structured grid layout */}
              <div className="absolute inset-8 grid grid-cols-3 grid-rows-3 gap-2 p-4">
                {/* Grid cells */}
                <div className="bg-purple-200 rounded shadow-sm border border-purple-300"></div>
                <div className="bg-purple-300 rounded shadow-sm border border-purple-400"></div>
                <div className="bg-purple-200 rounded shadow-sm border border-purple-300"></div>
                <div className="bg-purple-400 rounded shadow-sm border border-purple-500"></div>
                <div className="bg-purple-500 rounded shadow-sm border border-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Core</span>
                </div>
                <div className="bg-purple-400 rounded shadow-sm border border-purple-500"></div>
                <div className="bg-purple-200 rounded shadow-sm border border-purple-300"></div>
                <div className="bg-purple-300 rounded shadow-sm border border-purple-400"></div>
                <div className="bg-purple-200 rounded shadow-sm border border-purple-300"></div>
              </div>
              
              {/* Connection lines */}
              <div className="absolute inset-8 grid grid-cols-3 grid-rows-3 gap-2 p-4 z-10 pointer-events-none">
                <div className="relative">
                  <div className="absolute right-0 bottom-0 w-[calc(50%+1px)] h-[1px] bg-purple-600 opacity-70"></div>
                  <div className="absolute right-0 bottom-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
                <div className="relative">
                  <div className="absolute left-0 bottom-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                  <div className="absolute right-0 bottom-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
                <div className="relative">
                  <div className="absolute left-0 bottom-0 w-[calc(50%+1px)] h-[1px] bg-purple-600 opacity-70"></div>
                  <div className="absolute left-0 bottom-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                  <div className="absolute right-0 bottom-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
                <div className=""></div>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                  <div className="absolute left-0 bottom-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0 w-[calc(50%+1px)] h-[1px] bg-purple-600 opacity-70"></div>
                  <div className="absolute right-0 top-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                  <div className="absolute right-0 top-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-[calc(50%+1px)] h-[1px] bg-purple-600 opacity-70"></div>
                  <div className="absolute left-0 top-0 w-[1px] h-[calc(50%+1px)] bg-purple-600 opacity-70"></div>
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-md inline-block">
                  <span className="font-bold text-lg" style={{ color: color.main }}>Structure</span>
                </div>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute top-6 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  Organization of elements
                </span>
              </div>
            </div>
          )}
          
          {/* MECHANISM - Component 6 */}
          {currentStep === 6 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Gear system visualization */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                {/* Central gear */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-teal-100 border-8 border-teal-400 animate-spin" style={{ animationDuration: '10s' }}>
                  {/* Gear teeth */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-teal-400"
                      style={{ 
                        transform: `rotate(${i * 30}deg) translateY(-14px)`,
                        transformOrigin: 'center center' 
                      }}
                    ></div>
                  ))}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-teal-600"></div>
                </div>
                
                {/* Outer gears */}
                {[45, 135, 225, 315].map((angle, i) => (
                  <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full bg-teal-100 border-4 border-teal-400 animate-spin" 
                    style={{ 
                      transform: `rotate(${angle}deg) translate(26px) rotate(-${angle}deg)`,
                      animationDirection: i % 2 === 0 ? 'reverse' : 'normal',
                      animationDuration: '6s'
                    }}
                  >
                    {/* Gear teeth */}
                    {[...Array(8)].map((_, j) => (
                      <div 
                        key={j}
                        className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-teal-400"
                        style={{ 
                          transform: `rotate(${j * 45}deg) translateY(-8px)`,
                          transformOrigin: 'center center' 
                        }}
                      ></div>
                    ))}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-600"></div>
                  </div>
                ))}
              </div>
              
              {/* Label */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-md inline-block">
                  <span className="font-bold text-lg" style={{ color: color.main }}>Mechanism</span>
                </div>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute top-10 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  How the system works
                </span>
              </div>
            </div>
          )}
          
          {/* PARTS - Component 7 */}
          {currentStep === 7 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Parts and components visualization */}
              <div className="absolute inset-0 p-12">
                <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
                  {/* Individual parts with different shapes and functions */}
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-6 h-6 bg-indigo-400 rounded-full"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-6 h-6 bg-indigo-400 rounded"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-6 h-6 bg-indigo-400 rotate-45"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-4 h-8 bg-indigo-400 rounded-full"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-8 h-4 bg-indigo-400 rounded-full"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-6 h-6 rounded-full border-3 border-indigo-400 border-dashed"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-6 h-2 bg-indigo-400 rounded-full"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-2 h-6 bg-indigo-400 rounded-full"></div>
                  </div>
                  <div className="bg-indigo-100 rounded-lg border border-indigo-300 flex items-center justify-center shadow-sm">
                    <div className="w-6 h-6 border-4 border-indigo-400 rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Connection lines */}
              <div className="absolute inset-12 pointer-events-none">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#818cf8" strokeWidth="2" strokeDasharray="4" />
                  <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="#818cf8" strokeWidth="2" strokeDasharray="4" />
                  <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#818cf8" strokeWidth="2" strokeDasharray="4" />
                  <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="#818cf8" strokeWidth="2" strokeDasharray="4" />
                </svg>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-md inline-block z-10">
                  <span className="font-bold text-lg" style={{ color: color.main }}>Parts</span>
                </div>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute top-6 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  Individual components
                </span>
              </div>
            </div>
          )}
          
          {/* BEHAVIOR - Component 8 */}
          {currentStep === 8 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central system */}
              <div className="absolute inset-20 rounded-full border-8 border-orange-400 bg-white flex items-center justify-center z-10">
                <div className="w-20 h-20 rounded-lg bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
                  <div className="w-10 h-10 bg-orange-400 rounded"></div>
                </div>
              </div>
              
              {/* Behavior patterns radiating outward */}
              <div className="absolute inset-0">
                {/* Wave effects */}
                <div className="absolute inset-16 rounded-full border-4 border-orange-200 opacity-60 animate-ping" style={{animationDuration: '3s'}}></div>
                <div className="absolute inset-12 rounded-full border-4 border-orange-300 opacity-50 animate-ping" style={{animationDuration: '2.5s'}}></div>
                <div className="absolute inset-8 rounded-full border-4 border-orange-400 opacity-40 animate-ping" style={{animationDuration: '2s'}}></div>
                
                {/* Response patterns */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-10">
                  <div className="h-full mx-auto w-1 bg-orange-400"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center opacity-80">
                    <span className="text-orange-800 text-xs font-bold">R1</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-10">
                  <div className="h-full mx-auto w-1 bg-orange-400"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center opacity-80">
                    <span className="text-orange-800 text-xs font-bold">R2</span>
                  </div>
                </div>
                
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-24 w-10">
                  <div className="w-full my-auto h-1 bg-orange-400"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center opacity-80">
                    <span className="text-orange-800 text-xs font-bold">R3</span>
                  </div>
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-24 w-10">
                  <div className="w-full my-auto h-1 bg-orange-400"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center opacity-80">
                    <span className="text-orange-800 text-xs font-bold">R4</span>
                  </div>
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-md inline-block z-20">
                  <span className="font-bold text-lg" style={{ color: color.main }}>Behavior</span>
                </div>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute top-6 left-0 right-0 text-center z-20">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  System responses
                </span>
              </div>
            </div>
          )}
          
          {/* INPUT/OUTPUT - Component 9 */}
          {currentStep === 9 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central system */}
              <div className="absolute inset-20 rounded-lg bg-teal-50 border-2 border-teal-300 flex items-center justify-center">
                <div className="text-teal-600 font-bold">SYSTEM</div>
              </div>
              
              {/* Input flows */}
              <div className="absolute left-4 top-1/3 w-36 h-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-3 bg-gradient-to-r from-transparent to-teal-400 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-teal-400"></div>
                    
                    {/* Data packet animation */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-teal-600 rounded-full animate-ping-slow"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-teal-500 rounded-full animate-ping-slow" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-teal-700 rounded-full animate-ping-slow" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 rounded text-xs text-teal-600 font-medium">
                  Input
                </div>
              </div>
              
              <div className="absolute left-4 bottom-1/3 w-36 h-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-3 bg-gradient-to-r from-transparent to-teal-400 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-teal-400"></div>
                    
                    {/* Data packet animation */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-teal-600 rounded-sm animate-ping-slow"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-teal-500 rounded-sm animate-ping-slow" style={{animationDelay: '0.7s'}}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-teal-700 rounded-sm animate-ping-slow" style={{animationDelay: '1.3s'}}></div>
                  </div>
                </div>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 rounded text-xs text-teal-600 font-medium">
                  Input
                </div>
              </div>
              
              {/* Output flows */}
              <div className="absolute right-4 top-1/3 w-36 h-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-3 bg-gradient-to-l from-transparent to-teal-400 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-teal-400"></div>
                    
                    {/* Data packet animation */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-teal-600 rounded-full animate-ping-slow-reverse"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 bg-teal-500 rounded-full animate-ping-slow-reverse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 w-3 h-3 bg-teal-700 rounded-full animate-ping-slow-reverse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 rounded text-xs text-teal-600 font-medium">
                  Output
                </div>
              </div>
              
              <div className="absolute right-4 bottom-1/3 w-36 h-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-3 bg-gradient-to-l from-transparent to-teal-400 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-teal-400"></div>
                    
                    {/* Data packet animation */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-teal-600 rounded-sm animate-ping-slow-reverse"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 bg-teal-500 rounded-sm animate-ping-slow-reverse" style={{animationDelay: '0.7s'}}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 w-3 h-3 bg-teal-700 rounded-sm animate-ping-slow-reverse" style={{animationDelay: '1.3s'}}></div>
                  </div>
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 rounded text-xs text-teal-600 font-medium">
                  Output
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-md inline-block">
                  <span className="font-bold text-lg" style={{ color: color.main }}>Input & Output</span>
                </div>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute top-6 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  System flows
                </span>
              </div>
            </div>
          )}
          
          {/* COMPLETE SYSTEM - Component 10 */}
          {currentStep === 10 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Space - outermost layer */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-70"></div>
              
              {/* Boundary */}
              <div className="absolute inset-8 rounded-full border-2 border-green-400 opacity-70"></div>
              
              {/* Forces (arrows) */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-10 opacity-60"
                  style={{ 
                    background: colors[3].gradient,
                    transform: `rotate(${angle}deg) translateY(-30px)`,
                    transformOrigin: 'bottom center' 
                  }}
                ></div>
              ))}
              
              {/* Purpose - inner circle */}
              <div className="absolute inset-20 rounded-full border-2 border-pink-400 opacity-70 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-pink-100 opacity-40"></div>
              </div>
              
              {/* Structure - grid overlay */}
              <div className="absolute inset-16 rounded-full overflow-hidden opacity-30">
                <div className="w-full h-full bg-transparent border-2 border-purple-400 grid grid-cols-4 grid-rows-4">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="border border-purple-400"></div>
                  ))}
                </div>
              </div>
              
              {/* Mechanism - gears */}
              <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full border-2 border-teal-400 opacity-70 animate-spin" style={{animationDuration: '8s'}}></div>
              <div className="absolute top-1/4 left-1/2 w-8 h-8 rounded-full border-2 border-teal-400 opacity-70 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
              <div className="absolute bottom-1/4 right-1/3 w-8 h-8 rounded-full border-2 border-teal-400 opacity-70 animate-spin" style={{animationDuration: '6s'}}></div>
              
              {/* Parts - small components */}
              <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-indigo-400 rounded opacity-70"></div>
              <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-indigo-400 rounded-full opacity-70"></div>
              <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-indigo-400 rotate-45 opacity-70"></div>
              
              {/* Behavior - pulse waves */}
              <div className="absolute inset-24 rounded-full border-dashed border-2 border-orange-400 opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
              
              {/* I/O - arrows */}
              <div className="absolute left-8 top-1/2 w-12 h-2 bg-teal-400 opacity-50 -translate-y-1/2">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-teal-400"></div>
              </div>
              <div className="absolute right-8 top-1/2 w-12 h-2 bg-teal-400 opacity-50 -translate-y-1/2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 border-[4px] border-transparent border-r-teal-400"></div>
              </div>
              
              {/* System core */}
              <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg animate-pulse flex items-center justify-center">
                <span className="text-white font-bold">SYSTEM</span>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-md inline-block z-10">
                  <span className="font-bold text-lg" style={{ color: color.main }}>Complete System</span>
                </div>
              </div>
              
              {/* Supplementary text */}
              <div className="absolute top-6 left-0 right-0 text-center">
                <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  All components integrated
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs px-3 py-2 bg-gray-50 rounded-lg inline-block shadow-sm">
          <span className="font-medium" style={{ color: color.main }}>
            Figure {currentStep}.1: {stepNames[currentStep]} Component
          </span>
        </div>
      </div>
      
      {/* Component analysis metrics */}
      <div className="md:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2" style={{ color: color.main }}>
            Component Analysis
          </h3>
          <p className="text-sm text-gray-600">
            {analysisCaption}
          </p>
        </div>
        
        <div className="h-56 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analysisData} margin={{ top: 5, right: 20, bottom: 25, left: 10 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                hide={false} 
                domain={[0, 100]} 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: '#999' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: `1px solid ${color.main}`,
                  borderRadius: '4px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                  padding: '8px 12px'
                }} 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Bar 
                dataKey="value" 
                fill={color.main}
                radius={[4, 4, 0, 0]}
                barSize={40}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="text-xs text-gray-500 border-t border-gray-100 pt-3 flex justify-between items-center">
          <span>Data source: System Architecture Analysis 2025</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">Metric: Performance Impact</span>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;