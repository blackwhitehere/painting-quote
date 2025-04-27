/* eslint-disable sort-imports */
import { 
  ChevronLeft, 
  ChevronRight, 
  DoorOpen,
  Square,
  PanelTop, 
  AlertCircle,
  Brush,
  Palette,
  RefreshCw
} from 'lucide-react';
import React, { useState } from 'react';

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'back';
  icon?: React.ReactNode;
};

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex items-center cursor-help"
      >
        {children}
        <span className="ml-1 text-gray-500 text-sm">ⓘ</span>
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-2 bg-gray-800 text-white text-sm rounded shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

const Button = ({ onClick, disabled, children, variant = 'primary', icon }: ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2";
  
  const variantClasses = {
    primary: disabled 
      ? "bg-gray-300 cursor-not-allowed text-gray-500" 
      : "bg-blue-500 text-white hover:bg-blue-600",
    secondary: disabled
      ? "bg-gray-200 cursor-not-allowed text-gray-500"
      : "bg-white border border-blue-500 text-blue-500 hover:bg-blue-50",
    back: disabled
      ? "bg-gray-200 cursor-not-allowed text-gray-500"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

type ValidationErrorProps = {
  message: string | null;
};

const ValidationError = ({ message }: ValidationErrorProps) => {
  if (!message) return null;
  
  return (
    <div className="flex items-start gap-2 mt-2 mb-4 text-red-600">
      <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
};

// Common props for all question components
type CommonQuestionProps = {
  onNext: () => void;
  onPrevious: () => void;
  showPrevious: boolean;
  validationError?: string | null;
};

// SquareMetersQuestion component
export function SquareMetersQuestion({ 
  value, 
  onChange, 
  onNext,
  onPrevious,
  showPrevious,
  validationError
}: { 
  value: number | null; 
  onChange: (value: number) => void; 
} & CommonQuestionProps) {
  const [inputValue, setInputValue] = useState<string>(value !== null ? value.toString() : '');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Only update parent state if it's a valid number or empty string
    if (newValue === '') {
      onChange(0);
    } else {
      const parsed = parseInt(newValue);
      if (!isNaN(parsed)) {
        onChange(parsed);
      }
    }
  };
  
  return (
    <div className="mb-6">
      <label htmlFor="squareMeters" className="block mb-2 text-lg font-medium">
        How many square meters do you need to paint?
      </label>
      
      <div className="relative">
        <div className="flex items-center border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 border-r">
            <Square className="size-5 text-gray-500" />
          </div>
          <input
            id="squareMeters"
            type="number"
            min="0"
            value={inputValue}
            onChange={handleChange}
            className="w-full p-3 outline-none"
          />
        </div>
      </div>
      
      <ValidationError message={validationError || ''} />
      
      <div className="flex justify-between mt-6">
        {showPrevious ? (
          <Button 
            onClick={onPrevious} 
            variant="back"
            icon={<ChevronLeft className="size-4" />}
          >
            Back
          </Button>
        ) : <div></div>}
        
        <Button 
          onClick={onNext} 
          disabled={value === null || value < 0}
          variant="primary"
          icon={<ChevronRight className="size-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// DoorsWindowsQuestion component
export function DoorsWindowsQuestion({ 
  doors, 
  windows, 
  onDoorsChange, 
  onWindowsChange, 
  onNext,
  onPrevious,
  showPrevious,
  validationError
}: { 
  doors: number | null; 
  windows: number | null; 
  onDoorsChange: (value: number) => void; 
  onWindowsChange: (value: number) => void; 
} & CommonQuestionProps) {
  const [doorsInput, setDoorsInput] = useState<string>(doors !== null ? doors.toString() : '');
  const [windowsInput, setWindowsInput] = useState<string>(windows !== null ? windows.toString() : '');
  
  const handleDoorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDoorsInput(newValue);
    
    if (newValue === '') {
      onDoorsChange(0);
    } else {
      const parsed = parseInt(newValue);
      if (!isNaN(parsed)) {
        onDoorsChange(parsed);
      }
    }
  };
  
  const handleWindowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setWindowsInput(newValue);
    
    if (newValue === '') {
      onWindowsChange(0);
    } else {
      const parsed = parseInt(newValue);
      if (!isNaN(parsed)) {
        onWindowsChange(parsed);
      }
    }
  };
  
  return (
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="doors" className="block mb-2 text-lg font-medium">
          How many doors do you need to paint?
        </label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 border-r">
            <DoorOpen className="size-5 text-gray-500" />
          </div>
          <input
            id="doors"
            type="number"
            min="0"
            value={doorsInput}
            onChange={handleDoorsChange}
            className="w-full p-3 outline-none"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="windows" className="block mb-2 text-lg font-medium">
          How many windows do you need to paint?
        </label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 border-r">
            <PanelTop className="size-5 text-gray-500" />
          </div>
          <input
            id="windows"
            type="number"
            min="0"
            value={windowsInput}
            onChange={handleWindowsChange}
            className="w-full p-3 outline-none"
          />
        </div>
      </div>
      
      <ValidationError message={validationError || ''} />
      
      <div className="flex justify-between mt-6">
        {showPrevious && (
          <Button 
            onClick={onPrevious} 
            variant="back"
            icon={<ChevronLeft className="size-4" />}
          >
            Back
          </Button>
        )}
        
        <Button 
          onClick={onNext}
          variant="primary"
          icon={<ChevronRight className="size-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// ExistingColorQuestion component
export function ExistingColorQuestion({ 
  value, 
  onChange, 
  onNext,
  onPrevious,
  showPrevious
}: { 
  value: 'light' | 'dark' | null; 
  onChange: (value: 'light' | 'dark') => void; 
} & CommonQuestionProps) {
  return (
    <div className="mb-6">
      <p className="block mb-4 text-lg font-medium flex items-center gap-2">
        <Brush className="size-5 text-gray-700" />
        What is the color of existing paint?
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Tooltip text="Light colors include white, beige, light gray, pastels, etc. These typically require fewer coats to cover.">
          <button
            className={`p-4 rounded-md flex flex-col items-center justify-center gap-2 border-2 transition-all
              ${value === 'light' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange('light')}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Palette className="size-6 text-gray-400" />
            </div>
            <span className={value === 'light' ? 'text-blue-600 font-medium' : ''}>Light</span>
          </button>
        </Tooltip>
        
        <Tooltip text="Dark colors include dark blue, red, brown, black, etc. These may require more coats when painting over them.">
          <button
            className={`p-4 rounded-md flex flex-col items-center justify-center gap-2 border-2 transition-all
              ${value === 'dark' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange('dark')}
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
              <Palette className="size-6 text-gray-100" />
            </div>
            <span className={value === 'dark' ? 'text-blue-600 font-medium' : ''}>Dark</span>
          </button>
        </Tooltip>
      </div>
      
      <div className="flex justify-between mt-6">
        {showPrevious && (
          <Button 
            onClick={onPrevious} 
            variant="back"
            icon={<ChevronLeft className="size-4" />}
          >
            Back
          </Button>
        )}
        
        <Button 
          onClick={onNext} 
          disabled={!value}
          variant="primary"
          icon={<ChevronRight className="size-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// ColorTypeQuestion component
export function ColorTypeQuestion({ 
  value, 
  onChange, 
  onNext,
  onPrevious,
  showPrevious
}: { 
  value: 'light' | 'dark' | null; 
  onChange: (value: 'light' | 'dark') => void; 
} & CommonQuestionProps) {
  return (
    <div className="mb-6">
      <p className="block mb-4 text-lg font-medium flex items-center gap-2">
        <Brush className="size-5 text-gray-700" />
        Do you need a light or dark colour for the new paint?
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Tooltip text="Light colors include white, beige, light gray, pastels, etc. These typically require less paint to achieve good coverage.">
          <button
            className={`p-4 rounded-md flex flex-col items-center justify-center gap-2 border-2 transition-all
              ${value === 'light' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange('light')}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Palette className="size-6 text-gray-400" />
            </div>
            <span className={value === 'light' ? 'text-blue-600 font-medium' : ''}>Light</span>
          </button>
        </Tooltip>
        
        <Tooltip text="Dark colors include dark blue, red, brown, black, etc. These typically require more paint and may need additional coats.">
          <button
            className={`p-4 rounded-md flex flex-col items-center justify-center gap-2 border-2 transition-all
              ${value === 'dark' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange('dark')}
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
              <Palette className="size-6 text-gray-100" />
            </div>
            <span className={value === 'dark' ? 'text-blue-600 font-medium' : ''}>Dark</span>
          </button>
        </Tooltip>
      </div>
      
      <div className="flex justify-between mt-6">
        {showPrevious && (
          <Button 
            onClick={onPrevious} 
            variant="back"
            icon={<ChevronLeft className="size-4" />}
          >
            Back
          </Button>
        )}
        
        <Button 
          onClick={onNext} 
          disabled={!value}
          variant="primary"
          icon={<ChevronRight className="size-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// ConditionQuestion component
export function ConditionQuestion({ 
  value, 
  onChange, 
  onNext,
  onPrevious,
  showPrevious
}: { 
  value: 'bad' | 'medium' | 'good' | null; 
  onChange: (value: 'bad' | 'medium' | 'good') => void; 
} & CommonQuestionProps) {
  return (
    <div className="mb-6">
      <p className="block mb-4 text-lg font-medium">
        In which condition is the existing paint?
      </p>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Tooltip text="Bad condition includes peeling, cracking, bubbling paint that requires significant prep work, scraping, and potentially multiple primer coats.">
          <button
            className={`p-3 rounded-md flex flex-col items-center justify-center gap-2 border-2 transition-all
              ${value === 'bad' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange('bad')}
          >
            <div className="size-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="size-5 text-red-500" />
            </div>
            <span className={value === 'bad' ? 'text-blue-600 font-medium' : ''}>Bad</span>
          </button>
        </Tooltip>
        
        <Tooltip text="Medium condition includes some minor chips or cracks, fading, or light stains that require standard prep and cleaning before painting.">
          <button
            className={`p-3 rounded-md flex flex-col items-center justify-center gap-2 border-2 transition-all
              ${value === 'medium' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange('medium')}
          >
            <div className="size-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertCircle className="size-5 text-yellow-500" />
            </div>
            <span className={value === 'medium' ? 'text-blue-600 font-medium' : ''}>Medium</span>
          </button>
        </Tooltip>
        
        <Tooltip text="Good condition means the existing paint is intact, clean, and just needs a new coat for freshening up or color change.">
          <button
            className={`p-3 rounded-md flex flex-col items-center justify-center gap-2 border-2 transition-all
              ${value === 'good' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange('good')}
          >
            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
              <AlertCircle className="size-5 text-green-500" />
            </div>
            <span className={value === 'good' ? 'text-blue-600 font-medium' : ''}>Good</span>
          </button>
        </Tooltip>
      </div>
      
      <div className="flex justify-between mt-6">
        {showPrevious && (
          <Button 
            onClick={onPrevious} 
            variant="back"
            icon={<ChevronLeft className="size-4" />}
          >
            Back
          </Button>
        )}
        
        <Button 
          onClick={onNext} 
          disabled={!value}
          variant="primary"
          icon={<ChevronRight className="size-4" />}
        >
          Calculate Quote
        </Button>
      </div>
    </div>
  );
}

// QuoteResult component
export function QuoteResult({ 
  quote, 
  onRestart
}: { 
  quote: number; 
  onRestart: () => void;
}) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Painting Quote</h2>
      <p className="text-3xl font-bold text-blue-600 mb-6">
        €{quote.toFixed(2)}
      </p>
      <Button 
        onClick={onRestart}
        variant="primary"
        icon={<RefreshCw className="size-4" />}
      >
        Calculate New Quote
      </Button>
    </div>
  );
}
