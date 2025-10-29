import { useState, useCallback, useEffect } from 'react';

// Define the structure of a technical term
export interface TechnicalTerm {
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: Array<{ term: string; definition: string }>;
  domain?: 'software' | 'biology' | 'urban' | 'organization' | 'general';
}

// Map of common related terms for different domains
const commonRelatedTerms: Record<string, Array<{ term: string; definition: string }>> = {
  'microservices': [
    { 
      term: 'Service Discovery', 
      definition: 'The automatic detection of devices and services offered by these devices on a computer network.' 
    },
    { 
      term: 'API Gateway', 
      definition: 'A server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.' 
    },
    { 
      term: 'Load Balancing', 
      definition: 'The process of distributing network traffic across multiple servers to ensure no single server bears too much demand.' 
    },
    { 
      term: 'Circuit Breaker', 
      definition: 'A design pattern used to detect failures and encapsulates the logic of preventing a failure from constantly recurring.' 
    }
  ],
  'complex systems': [
    { 
      term: 'Emergence', 
      definition: 'The appearance of novel properties in systems as a result of interactions between components.' 
    },
    { 
      term: 'Feedback Loop', 
      definition: 'A system where the output or result is used as input for future behavior of the system.' 
    },
    { 
      term: 'Self-organization', 
      definition: 'The spontaneous formation of patterns or structures in a system without explicit external direction.' 
    },
    { 
      term: 'Adaptation', 
      definition: 'The process by which a system adjusts to changes in its environment to maintain functionality.' 
    }
  ],
  'systems thinking': [
    { 
      term: 'Holistic Analysis', 
      definition: 'Examining a system as a whole rather than focusing solely on individual components.' 
    },
    { 
      term: 'Interdependence', 
      definition: 'The mutual reliance between components in a system.' 
    },
    { 
      term: 'System Boundaries', 
      definition: 'The conceptual limits that define what is included in or excluded from a particular system.' 
    },
    { 
      term: 'Causal Loop Diagram', 
      definition: 'A visual representation showing how different variables in a system are causally related.' 
    }
  ],
  'urban planning': [
    { 
      term: 'Mixed-Use Development', 
      definition: 'An urban development that blends residential, commercial, cultural, institutional, or entertainment uses into one space.' 
    },
    { 
      term: 'Transit-Oriented Development', 
      definition: 'A type of urban development that maximizes the amount of residential, business and leisure space within walking distance of public transport.' 
    },
    { 
      term: 'Smart City', 
      definition: 'An urban area that uses different types of electronic methods and sensors to collect data to manage assets and resources efficiently.' 
    },
    { 
      term: 'Green Infrastructure', 
      definition: 'A strategically planned network of natural and semi-natural areas designed and managed to deliver a wide range of ecosystem services.' 
    }
  ]
};

// Hook for managing technical terms and the term explorer
export function useTermExplorer() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [activeTerm, setActiveTerm] = useState<TechnicalTerm | null>(null);
  const [clickedTerms, setClickedTerms] = useState<string[]>([]);
  
  // Close the explorer
  const closeExplorer = useCallback(() => {
    setIsExplorerOpen(false);
    
    // After closing, remove the 'clicked' class from all terms after a delay
    setTimeout(() => {
      setClickedTerms([]);
      
      // Remove the 'clicked' class from all technical terms
      document.querySelectorAll('.technical-term').forEach(el => {
        el.classList.remove('clicked');
      });
    }, 300);
  }, []);
  
  // Open the explorer with a specific term
  const openExplorer = useCallback((term: string, definition: string) => {
    // Generate related terms based on the term content or use defaults
    const relatedTermsList = 
      commonRelatedTerms[term.toLowerCase()] || 
      commonRelatedTerms['complex systems'] || 
      [];
    
    // Set the active term
    setActiveTerm({
      term,
      definition,
      relatedTerms: relatedTermsList
    });
    
    // Add this term to the clicked terms
    setClickedTerms(prev => [...prev, term]);
    
    // Open the explorer
    setIsExplorerOpen(true);
  }, []);
  
  // Initialize click handlers for technical terms
  useEffect(() => {
    const handleTermClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the clicked element is a technical term
      if (target.classList.contains('technical-term')) {
        e.preventDefault();
        
        // Get the term and definition
        const term = target.textContent || '';
        const definition = target.getAttribute('data-tooltip') || '';
        
        // Add the clicked class to this term
        target.classList.add('clicked');
        
        // Open the explorer
        openExplorer(term, definition);
      }
    };
    
    // Add click event listener to the document
    document.addEventListener('click', handleTermClick);
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleTermClick);
    };
  }, [openExplorer]);
  
  return {
    isExplorerOpen,
    activeTerm,
    clickedTerms,
    openExplorer,
    closeExplorer
  };
}

export default useTermExplorer;