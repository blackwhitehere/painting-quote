import React from 'react';

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({ onClick, disabled, children }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-medium ${
      disabled 
        ? 'bg-gray-300 cursor-not-allowed' 
        : 'bg-blue-500 text-white hover:bg-blue-600'
    }`}
  >
    {children}
  </button>
);

// SquareMetersQuestion component
export function SquareMetersQuestion({ 
  value, 
  onChange, 
  onNext 
}: { 
  value: number; 
  onChange: (value: number) => void; 
  onNext: () => void;
}) {
  return (
    <div className="mb-6">
      <label htmlFor="squareMeters" className="block mb-2 text-lg font-medium">
        How many square meters do you need to paint?
      </label>
      <input
        id="squareMeters"
        type="number"
        min="1"
        value={value || ''}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full p-2 border rounded-md mb-4"
      />
      <Button 
        onClick={onNext} 
        disabled={!value || value <= 0}
      >
        Next
      </Button>
    </div>
  );
}

// DoorsWindowsQuestion component
export function DoorsWindowsQuestion({ 
  doors, 
  windows, 
  onDoorsChange, 
  onWindowsChange, 
  onNext 
}: { 
  doors: number; 
  windows: number; 
  onDoorsChange: (value: number) => void; 
  onWindowsChange: (value: number) => void; 
  onNext: () => void;
}) {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="doors" className="block mb-2 text-lg font-medium">
          How many doors do you need to paint?
        </label>
        <input
          id="doors"
          type="number"
          min="0"
          value={doors || ''}
          onChange={(e) => onDoorsChange(parseInt(e.target.value) || 0)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="windows" className="block mb-2 text-lg font-medium">
          How many windows do you need to paint?
        </label>
        <input
          id="windows"
          type="number"
          min="0"
          value={windows || ''}
          onChange={(e) => onWindowsChange(parseInt(e.target.value) || 0)}
          className="w-full p-2 border rounded-md mb-4"
        />
      </div>
      
      <Button onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

// ColorTypeQuestion component
export function ColorTypeQuestion({ 
  value, 
  onChange, 
  onNext 
}: { 
  value: 'light' | 'dark' | null; 
  onChange: (value: 'light' | 'dark') => void; 
  onNext: () => void;
}) {
  return (
    <div className="mb-6">
      <p className="block mb-4 text-lg font-medium">
        Do you need a light or dark colour for the new paint?
      </p>
      
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${value === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onChange('light')}
        >
          Light
        </button>
        <button
          className={`px-4 py-2 rounded-md ${value === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onChange('dark')}
        >
          Dark
        </button>
      </div>
      
      <Button 
        onClick={onNext} 
        disabled={!value}
      >
        Next
      </Button>
    </div>
  );
}

// ConditionQuestion component
export function ConditionQuestion({ 
  value, 
  onChange, 
  onNext 
}: { 
  value: 'bad' | 'medium' | 'good' | null; 
  onChange: (value: 'bad' | 'medium' | 'good') => void; 
  onNext: () => void;
}) {
  return (
    <div className="mb-6">
      <p className="block mb-4 text-lg font-medium">
        In which condition is the existing paint?
      </p>
      
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${value === 'bad' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onChange('bad')}
        >
          Bad
        </button>
        <button
          className={`px-4 py-2 rounded-md ${value === 'medium' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onChange('medium')}
        >
          Medium
        </button>
        <button
          className={`px-4 py-2 rounded-md ${value === 'good' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onChange('good')}
        >
          Good
        </button>
      </div>
      
      <Button 
        onClick={onNext} 
        disabled={!value}
      >
        Calculate Quote
      </Button>
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
      <Button onClick={onRestart}>
        Calculate New Quote
      </Button>
    </div>
  );
}
