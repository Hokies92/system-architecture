import React from 'react';

type StepNavigationProps = {
  currentStep: number;
  stepNames: Record<number, string>;
  goToStep: (step: number) => void;
};

const StepNavigation: React.FC<StepNavigationProps> = ({ 
  currentStep, 
  stepNames, 
  goToStep 
}) => {
  // Generate step items for navigation
  const renderStepItems = () => {
    return Array.from({ length: 10 }, (_, i) => i + 1).map(step => (
      <div 
        key={step}
        className={`flex items-center p-3 my-2 rounded-md cursor-pointer ${currentStep === step ? 'bg-blue-50 text-blue-800 font-medium' : 'hover:bg-gray-100'}`}
        onClick={() => goToStep(step)}
      >
        <div 
          className={`w-7 h-7 rounded-full mr-3 flex items-center justify-center ${
            currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {step}
        </div>
        <div>{stepNames[step]}</div>
      </div>
    ));
  };

  return (
    <div className="step-navigation">
      {renderStepItems()}
    </div>
  );
};

export default StepNavigation;