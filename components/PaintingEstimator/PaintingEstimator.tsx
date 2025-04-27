"use client";

import { useState } from 'react';
import { 
  SquareMetersQuestion,
  DoorsWindowsQuestion,
  ColorTypeQuestion,
  ConditionQuestion,
  QuoteResult
} from './QuestionComponents';
import { calculatePaintingQuote } from '../../lib/pricing';
import { EstimatorState } from './types';

export function PaintingEstimator() {
  const [state, setState] = useState<EstimatorState>({
    step: 1,
    squareMeters: 0,
    doors: 0,
    windows: 0,
    colorType: null,
    condition: null,
  });
  
  const [quote, setQuote] = useState<number | null>(null);
  
  const nextStep = () => {
    if (state.step === 4) {
      // Calculate the quote when reaching the end
      const calculatedQuote = calculatePaintingQuote(
        state.squareMeters,
        state.doors,
        state.windows,
        state.colorType!,
        state.condition!
      );
      setQuote(calculatedQuote);
    }
    
    setState(prev => ({
      ...prev,
      step: prev.step + 1
    }));
  };
  
  const restartQuote = () => {
    setState({
      step: 1,
      squareMeters: 0,
      doors: 0,
      windows: 0,
      colorType: null,
      condition: null,
    });
    setQuote(null);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Painting Job Estimator</h2>
      
      {state.step === 1 && (
        <SquareMetersQuestion 
          value={state.squareMeters}
          onChange={(value) => setState(prev => ({ ...prev, squareMeters: value }))}
          onNext={nextStep}
        />
      )}
      
      {state.step === 2 && (
        <DoorsWindowsQuestion 
          doors={state.doors}
          windows={state.windows}
          onDoorsChange={(value) => setState(prev => ({ ...prev, doors: value }))}
          onWindowsChange={(value) => setState(prev => ({ ...prev, windows: value }))}
          onNext={nextStep}
        />
      )}
      
      {state.step === 3 && (
        <ColorTypeQuestion 
          value={state.colorType}
          onChange={(value) => setState(prev => ({ ...prev, colorType: value }))}
          onNext={nextStep}
        />
      )}
      
      {state.step === 4 && (
        <ConditionQuestion 
          value={state.condition}
          onChange={(value) => setState(prev => ({ ...prev, condition: value }))}
          onNext={nextStep}
        />
      )}
      
      {state.step === 5 && quote !== null && (
        <QuoteResult 
          quote={quote}
          onRestart={restartQuote}
        />
      )}
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Step {state.step} of {state.step >= 5 ? 5 : 4}
      </div>
    </div>
  );
}
