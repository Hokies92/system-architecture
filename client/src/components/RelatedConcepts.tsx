import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';

type RelatedConceptsProps = {
  concepts: string[];
  exploreTags: string[];
  nextStep: {
    number: number;
    title: string;
  };
  goToStep: (step: number) => void;
  onConceptClick?: (concept: string) => void;
  onTagClick?: (tag: string) => void;
};

const RelatedConcepts: React.FC<RelatedConceptsProps> = ({
  concepts,
  exploreTags,
  nextStep,
  goToStep,
  onConceptClick,
  onTagClick
}) => {
  // Handle concept click
  const handleConceptClick = (concept: string) => {
    if (onConceptClick) {
      onConceptClick(concept);
    }
  };
  
  // Handle tag click
  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Related concepts section */}
      <div className="md:col-span-1">
        <h4 className="text-sm font-medium mb-3">Related Concepts</h4>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <ul className="space-y-2">
            {concepts.map((concept, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <span 
                  className="text-sm text-gray-700 hover:text-primary cursor-pointer hover:underline"
                  onClick={() => handleConceptClick(concept)}
                >
                  {concept}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Explore tags section */}
      <div className="md:col-span-1">
        <h4 className="text-sm font-medium mb-3">Explore Further</h4>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {exploreTags.map((tag, index) => (
              <div 
                key={index}
                className="px-3 py-1 bg-white text-sm rounded-full border border-gray-200 cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Next step section */}
      <div className="md:col-span-1">
        <h4 className="text-sm font-medium mb-3">Next Step</h4>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Step {nextStep.number}</div>
              <div className="font-medium">{nextStep.title}</div>
            </div>
            <Button 
              size="sm" 
              className="gap-1"
              onClick={() => goToStep(nextStep.number)}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedConcepts;