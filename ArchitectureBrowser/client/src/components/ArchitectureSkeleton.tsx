import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface ArchitectureSkeletonProps {
  isLoading: boolean;
  height?: string;
  pattern?: number;
}

export const ArchitectureSkeleton: React.FC<ArchitectureSkeletonProps> = ({ 
  isLoading, 
  height = "250px", 
  pattern = 0 
}) => {
  // Only render skeleton when loading
  if (!isLoading) return null;
  
  // Different skeleton patterns
  const renderPattern = () => {
    switch (pattern) {
      case 0:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-full animate-pulse bg-gray-200 mb-4"></div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-48" />
          </div>
        );
      case 1:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gray-100 rounded-lg animate-pulse"></div>
              
              {/* Four corner elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Layered architecture */}
            <div className="relative w-64 h-56">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-10 bg-gray-100 border border-gray-200 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-52 h-10 bg-gray-100 border border-gray-200 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-10 bg-gray-100 border border-gray-200 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-44 h-10 bg-gray-100 border border-gray-200 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-gray-100 border border-gray-200 rounded animate-pulse"></div>
            </div>
            <Skeleton className="h-4 w-32 mt-4" />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Microservices pattern */}
            <div className="relative w-64 h-56">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-100 rounded-lg animate-pulse"></div>
              
              {/* Surrounding services */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.15s' }}></div>
              <div className="absolute top-1/4 right-4 w-12 h-12 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-1/4 right-4 w-12 h-12 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.45s' }}></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="absolute top-1/4 left-4 w-12 h-12 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.75s' }}></div>
              <div className="absolute bottom-1/4 left-4 w-12 h-12 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.9s' }}></div>
              
              {/* Connection lines */}
              <div className="absolute top-[72px] left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-200"></div>
              <div className="absolute top-1/2 right-[72px] transform -translate-y-1/2 w-8 h-1 bg-gray-200"></div>
              <div className="absolute bottom-[72px] left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-200"></div>
              <div className="absolute top-1/2 left-[72px] transform -translate-y-1/2 w-8 h-1 bg-gray-200"></div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Event-driven architecture */}
            <div className="relative w-64 h-56">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-8 bg-gray-100 rounded animate-pulse"></div>
              
              <div className="absolute top-4 left-4 w-16 h-16 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <Skeleton className="h-4 w-40 mt-4" />
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-2/3 h-2/3 rounded-lg"></div>
          </div>
        );
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-100" style={{ height }}>
      {renderPattern()}
    </div>
  );
};

export const ComponentSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            {i % 2 === 0 && <Skeleton className="h-3 w-4/5" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      
      <div className="pt-2 mt-4 border-t border-gray-100 flex items-center justify-between">
        <Skeleton className="h-8 w-24 rounded" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

export default ArchitectureSkeleton;