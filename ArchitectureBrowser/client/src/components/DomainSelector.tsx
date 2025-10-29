import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Code2, Leaf, UsersRound, ArrowRight } from 'lucide-react';

type DomainSelectorProps = {
  activeDomain: string;
  setActiveDomain: (domain: string) => void;
  domainExamples: Record<string, Record<number, { title: string; description: string; tags: string[] }>>;
  currentStep: number;
  onExploreClick: (domain: string) => void;
};

const DomainSelector: React.FC<DomainSelectorProps> = ({
  activeDomain,
  setActiveDomain,
  domainExamples,
  currentStep,
  onExploreClick
}) => {
  // Domain specific icons and colors
  const domainInfo = {
    software: { 
      icon: <Code2 className="h-4 w-4" />, 
      color: 'bg-blue-500',
      label: 'Software'
    },
    bio: { 
      icon: <Leaf className="h-4 w-4" />, 
      color: 'bg-green-500',
      label: 'Biology'
    },
    org: { 
      icon: <UsersRound className="h-4 w-4" />, 
      color: 'bg-purple-500',
      label: 'Organizations'
    },
    urban: { 
      icon: <Building2 className="h-4 w-4" />, 
      color: 'bg-amber-500',
      label: 'Urban Planning'
    }
  };
  
  // Get domains to display - only primary domains
  const domains = ['software', 'bio', 'org', 'urban'];
  
  // Current domain example for the active step
  const currentExample = domainExamples[activeDomain]?.[currentStep];
  
  return (
    <div className="domain-selector">
      <div className="flex flex-wrap gap-2 mb-4">
        {domains.map(domain => (
          <Button
            key={domain}
            variant={activeDomain === domain ? "default" : "outline"}
            size="sm"
            className={`gap-1 ${activeDomain === domain ? 'text-white' : ''}`}
            onClick={() => setActiveDomain(domain)}
          >
            {domainInfo[domain as keyof typeof domainInfo]?.icon}
            <span>{domainInfo[domain as keyof typeof domainInfo]?.label}</span>
          </Button>
        ))}
      </div>
      
      {currentExample && (
        <Card className="p-3 border border-gray-200 mt-2">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-sm">{currentExample.title}</h4>
            <div className={`${domainInfo[activeDomain as keyof typeof domainInfo]?.color} text-xs text-white px-2 py-1 rounded-full`}>
              {domainInfo[activeDomain as keyof typeof domainInfo]?.label}
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mb-3">
            {currentExample.description.length > 100 
              ? `${currentExample.description.substring(0, 100)}...` 
              : currentExample.description}
          </p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs gap-1 p-0 h-auto text-primary hover:bg-transparent hover:underline"
            onClick={() => onExploreClick(activeDomain)}
          >
            See more examples
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Card>
      )}
    </div>
  );
};

export default DomainSelector;