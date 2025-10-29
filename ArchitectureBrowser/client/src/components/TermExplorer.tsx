import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TermExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  term: string;
  definition: string;
  relatedTerms?: { term: string; definition: string }[];
}

const TermExplorer: React.FC<TermExplorerProps> = ({
  isOpen,
  onClose,
  term,
  definition,
  relatedTerms = []
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Apply entrance and exit animations
  const overlayClasses = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';
    
  const dialogClasses = isOpen
    ? 'transform-none opacity-100'
    : 'translate-y-4 opacity-0';
  
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-200 ${overlayClasses}`}
    >
      <div 
        ref={dialogRef}
        className={`w-full max-w-md transition-all duration-200 ${dialogClasses}`}
      >
        <Card className="overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary/5">
            <h3 className="text-lg font-semibold text-gray-800">
              <span className="text-primary">{term}</span>
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4">
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-md mb-4">
              <p className="text-gray-700">{definition}</p>
            </div>
            
            {relatedTerms.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Related Terms</h4>
                <div className="space-y-2">
                  {relatedTerms.map((related, idx) => (
                    <div key={idx} className="p-2 bg-primary/5 border border-primary/10 rounded-md">
                      <div className="font-medium text-sm text-primary">
                        {related.term}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {related.definition}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermExplorer;