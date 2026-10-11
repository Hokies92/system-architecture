import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronRight,
  ChevronLeft,
  Layers,
  Box,
  Zap,
  Settings,
  Component,
  Workflow,
  Cpu,
  Activity,
  ArrowRightLeft,
  Puzzle,
  Info,
  BookOpen,
  ExternalLink,
  ChevronDown,
  Lightbulb,
  ArrowRight,
  Split
} from 'lucide-react';
import { stepNames, stepDescriptions, keyCharacteristics, domainExamples, relatedConcepts, exploreTags, nextStepInfo } from '@/data/architectureData';

import StepNavigation from './StepNavigation';
import DomainSelector from './DomainSelector';
import RelatedConcepts from './RelatedConcepts';
import ArchitectureSkeleton, { ComponentSkeleton } from './ArchitectureSkeleton';
import { Skeleton } from "@/components/ui/skeleton";

const ArchitectureExplorer = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeDomain, setActiveDomain] = useState<string>('software');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Simulate loading state
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  // Navigation functions
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 10) {
      setIsLoading(true);
      setCurrentStep(step);
      
      // Simulate loading when changing steps
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < 10) {
      goToStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };
  
  const handleDomainChange = (domain: string) => {
    setActiveDomain(domain);
    toast({
      title: "Domain Changed",
      description: `Viewing examples for ${domain.charAt(0).toUpperCase() + domain.slice(1)} domain`,
      duration: 2000,
    });
  };
  
  const handleExploreClick = (domain: string) => {
    setActiveDomain(domain);
    toast({
      title: "Domain Selected",
      description: `Exploring ${domain.charAt(0).toUpperCase() + domain.slice(1)} domain examples`,
      duration: 2000,
    });
  };
  
  // Helper to get step color
  const getStepColor = (step: number): string => {
    const colors = [
      '#4299e1', // blue
      '#48bb78', // green
      '#f6ad55', // orange
      '#f687b3', // pink
      '#9f7aea', // purple
      '#4fd1c5', // teal
      '#667eea', // indigo
      '#ed8936', // orange-darker
      '#38b2ac', // teal-darker
      '#5a67d8', // indigo-darker
    ];
    return colors[(step - 1) % colors.length];
  };
  
  // Component for displaying step diagrams
  const ArchitectureDiagram = () => {
    // Helper to get diagram details based on step
    const getStepIcon = (step: number) => {
      const icons = {
        1: <Box className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        2: <Layers className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        3: <Zap className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        4: <Lightbulb className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        5: <Component className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        6: <Settings className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        7: <Puzzle className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        8: <Activity className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        9: <ArrowRightLeft className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />,
        10: <Cpu className="w-8 h-8 mx-auto" style={{ color: getStepColor(step) }} />
      };
      return icons[step as keyof typeof icons];
    };

    // Calculate positions for orbital elements
    const getOrbitalPosition = (index: number, total: number) => {
      const angle = (index / total) * 2 * Math.PI;
      const x = Math.sin(angle) * 100 + 100; // 100 is center, 100 is radius
      const y = -Math.cos(angle) * 100 + 100; // negative because y-axis is flipped in CSS
      return { x, y };
    };

    // Generate small orbital elements
    const renderOrbitalSteps = () => {
      // Only show neighboring steps and key related steps
      let stepsToShow: number[] = [];
      
      if (currentStep === 1) {
        stepsToShow = [2, 3, 10];
      } else if (currentStep === 10) {
        stepsToShow = [1, 8, 9];
      } else {
        // Show previous and next steps
        stepsToShow = [
          currentStep - 1 > 0 ? currentStep - 1 : 10,
          currentStep + 1 <= 10 ? currentStep + 1 : 1
        ];
        
        // Add a relevant step based on relationships
        const additionalStep = currentStep % 2 === 0 ? 
          Math.min(currentStep + 3, 10) : 
          Math.max(currentStep - 2, 1);
        if (!stepsToShow.includes(additionalStep)) {
          stepsToShow.push(additionalStep);
        }
      }

      return stepsToShow.map((step, index) => {
        const pos = getOrbitalPosition(index, stepsToShow.length);
        const isNextStep = step === (currentStep === 10 ? 1 : currentStep + 1);
        
        return (
          <div 
            key={step}
            className={`absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full 
                      border-2 shadow-sm flex items-center justify-center cursor-pointer transition-all
                      ${isNextStep ? 'animate-pulse' : ''}`}
            style={{ 
              left: `${pos.x}px`, 
              top: `${pos.y}px`,
              borderColor: getStepColor(step),
              opacity: 0.9,
              transform: 'translate(-50%, -50%) scale(0.8)'
            }}
            onClick={() => goToStep(step)}
          >
            <div className="text-xs font-medium text-center">
              {getStepIcon(step)}
              <span className="block text-[8px] mt-0.5 opacity-80" style={{ color: getStepColor(step) }}>
                {stepNames[step as keyof typeof stepNames]}
              </span>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="relative bg-white rounded-lg p-6 h-[350px] border border-gray-200 flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-5 rounded-lg"
          style={{ backgroundImage: `linear-gradient(135deg, ${getStepColor(currentStep)}, white)` }}
        ></div>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2" style={{ color: getStepColor(currentStep) }}>
            {stepNames[currentStep as keyof typeof stepNames]}
          </h3>
          <p className="text-gray-600 text-sm max-w-md">
            {stepDescriptions[currentStep as keyof typeof stepDescriptions]}
          </p>
        </div>
        
        <div className="relative w-full h-64 max-w-xs">
          {/* Base circle */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed opacity-40"
               style={{ borderColor: getStepColor(currentStep) }}></div>
               
          {/* Connection lines */}
          <div className="absolute inset-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Subtle radial lines */}
              <circle cx="100" cy="100" r="80" fill="none" stroke={getStepColor(currentStep)} 
                strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.3" />
              <circle cx="100" cy="100" r="60" fill="none" stroke={getStepColor(currentStep)} 
                strokeWidth="0.3" strokeDasharray="1 3" strokeOpacity="0.2" />
            </svg>
          </div>
          
          {/* Orbital elements */}
          {renderOrbitalSteps()}
          
          {/* Center element */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-white p-4 rounded-lg shadow-md border-2 w-32 h-32 
                        flex items-center justify-center z-10"
               style={{ borderColor: getStepColor(currentStep) }}>
            <div className="text-center">
              <div className="mb-2">
                {getStepIcon(currentStep)}
              </div>
              <div className="font-medium" style={{ color: getStepColor(currentStep) }}>
                {stepNames[currentStep as keyof typeof stepNames]}
              </div>
              <div className="text-xs mt-1 text-gray-500">
                Step {currentStep}/10
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="architecture-explorer">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar with step navigation */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <div className="bg-gray-100 p-4 border-b">
              <h3 className="font-semibold text-lg flex items-center">
                <Workflow className="mr-2 h-5 w-5 text-primary" /> 
                Architectural Steps
              </h3>
            </div>
            
            <div className="p-4">
              {isLoading ? (
                <ComponentSkeleton count={10} />
              ) : (
                <StepNavigation 
                  currentStep={currentStep}
                  stepNames={stepNames}
                  goToStep={goToStep}
                />
              )}
            </div>
          </Card>
          
          {/* Domain selector */}
          <Card className="mt-6 overflow-hidden">
            <div className="bg-gray-100 p-4 border-b">
              <h3 className="font-semibold text-lg flex items-center">
                <Split className="mr-2 h-5 w-5 text-primary" /> 
                Domain Examples
              </h3>
            </div>
            
            <div className="p-4">
              {isLoading ? (
                <ComponentSkeleton count={4} />
              ) : (
                <DomainSelector 
                  activeDomain={activeDomain}
                  setActiveDomain={handleDomainChange}
                  domainExamples={domainExamples}
                  currentStep={currentStep}
                  onExploreClick={handleExploreClick}
                />
              )}
            </div>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-9">
          <Card>
            <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg flex items-center">
                <Component className="mr-2 h-5 w-5 text-primary" />
                {isLoading ? (
                  <Skeleton className="h-6 w-40" />
                ) : (
                  <span>
                    Step {currentStep}: {stepNames[currentStep as keyof typeof stepNames]}
                  </span>
                )}
              </h3>
              
              {/* Step navigation controls */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handlePrevStep} 
                  disabled={currentStep <= 1 || isLoading}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleNextStep} 
                  disabled={currentStep >= 10 || isLoading}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4 flex items-center">
                    <h3 className="font-medium text-lg">System Diagram</h3>
                  </div>
                  
                  {isLoading ? (
                    <ArchitectureSkeleton isLoading={true} height="300px" pattern={currentStep % 5} />
                  ) : (
                    <ArchitectureDiagram />
                  )}
                </div>
                
                <div>
                  <Tabs defaultValue="description">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
                      <TabsTrigger value="examples">Examples</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="mt-0">
                      <Card className="border">
                        <div className="p-4">
                          {isLoading ? (
                            <>
                              <Skeleton className="h-4 w-full mb-2" />
                              <Skeleton className="h-4 w-full mb-2" />
                              <Skeleton className="h-4 w-3/4" />
                            </>
                          ) : (
                            <div className="prose max-w-full">
                              <p className="text-gray-700">
                                {stepDescriptions[currentStep as keyof typeof stepDescriptions]}
                              </p>
                              
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Points:</h4>
                                <ul className="text-sm space-y-1 text-gray-700">
                                  {keyCharacteristics[currentStep as keyof typeof keyCharacteristics]?.map((point, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="mr-2 mt-0.5">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="characteristics" className="mt-0">
                      <Card className="border">
                        <div className="p-4">
                          {isLoading ? (
                            <ComponentSkeleton count={5} />
                          ) : (
                            <div className="space-y-4">
                              <h4 className="text-sm font-medium">System Characteristics for {stepNames[currentStep as keyof typeof stepNames]}</h4>
                              <div className="grid grid-cols-1 gap-3">
                                {keyCharacteristics[currentStep as keyof typeof keyCharacteristics]?.map((char, idx) => (
                                  <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-100">
                                    <div className="mr-3 h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium"
                                         style={{ backgroundImage: `linear-gradient(135deg, ${getStepColor(currentStep)}, #cbd5e1)` }}>
                                      {idx + 1}
                                    </div>
                                    <div className="text-sm">{char}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="examples" className="mt-0">
                      <Card className="border">
                        <div className="p-4">
                          {isLoading ? (
                            <ComponentSkeleton count={3} />
                          ) : (
                            <div className="space-y-4">
                              <h4 className="text-sm font-medium mb-2">
                                Examples for {activeDomain.charAt(0).toUpperCase() + activeDomain.slice(1)} Domain
                              </h4>
                              
                              <div className="p-3 border border-gray-200 rounded-md">
                                <div className="flex justify-between items-start">
                                  <h5 className="font-medium text-gray-900">
                                    {domainExamples[activeDomain as keyof typeof domainExamples]?.[currentStep as keyof (typeof domainExamples)['software']]?.title || "Example Not Available"}
                                  </h5>
                                  <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full">
                                    {activeDomain.charAt(0).toUpperCase() + activeDomain.slice(1)}
                                  </span>
                                </div>
                                
                                <p className="mt-2 text-sm text-gray-700">
                                  {domainExamples[activeDomain as keyof typeof domainExamples]?.[currentStep as keyof (typeof domainExamples)['software']]?.description || 
                                    "Detailed example not available for this component in the selected domain."}
                                </p>
                                
                                {domainExamples[activeDomain as keyof typeof domainExamples]?.[currentStep as keyof (typeof domainExamples)['software']]?.tags && (
                                  <div className="mt-3 flex flex-wrap gap-1">
                                    {domainExamples[activeDomain as keyof typeof domainExamples]?.[currentStep as keyof (typeof domainExamples)['software']]?.tags.map((tag, idx) => (
                                      <span key={idx} className="inline-block px-2 py-1 bg-gray-50 text-xs rounded-full border border-gray-200">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              
                              <Button variant="outline" size="sm" className="mt-2 w-full flex items-center justify-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>View Related Documentation</span>
                                <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              {/* Related concepts */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Related Concepts & Next Steps</h3>
                
                {isLoading ? (
                  <ComponentSkeleton count={1} />
                ) : (
                  <RelatedConcepts 
                    concepts={relatedConcepts[currentStep as keyof typeof relatedConcepts] || []}
                    exploreTags={exploreTags[currentStep as keyof typeof exploreTags] || []}
                    nextStep={nextStepInfo[currentStep as keyof typeof nextStepInfo] || { number: currentStep + 1, title: "Next Step" }}
                    goToStep={goToStep}
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureExplorer;