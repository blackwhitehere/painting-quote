"use client";

import { useState } from 'react';
import {
    ColorTypeQuestion,
    ConditionQuestion,
    DoorsWindowsQuestion,
    ExistingColorQuestion,
    QuoteResult,
    SquareMetersQuestion
} from './QuestionComponents';
import { calculatePaintingQuote } from '../../lib/pricing';
import { EstimatorState } from './types';

export function PaintingEstimator() {
    const [state, setState] = useState<EstimatorState>({
        step: 1,
        squareMeters: null,
        doors: null,
        windows: null,
        colorType: null,
        condition: null,
        existingColorType: null,
    });

    const [quote, setQuote] = useState<number | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    // Updated to safely check null values
    const isAtLeastOnePositiveNumericInput = () => {
        return (state.squareMeters || 0) > 0 || 
               (state.doors || 0) > 0 || 
               (state.windows || 0) > 0;
    };

    const nextStep = () => {
        // For step 2, validate that at least one of the inputs is > 0
        if (state.step === 2 && !isAtLeastOnePositiveNumericInput()) {
            setValidationError("At least one of square meters, doors, or windows must be greater than zero.");
            return;
        }

        // Clear any validation errors when moving forward
        setValidationError(null);
        
        if (state.step === 5) { // Now we have 5 steps before quote
            // Calculate the quote when reaching the end, ensure all values are numbers
            const calculatedQuote = calculatePaintingQuote(
                state.squareMeters || 0,
                state.doors || 0,
                state.windows || 0,
                state.colorType!,
                state.condition!,
                state.existingColorType!
            );
            setQuote(calculatedQuote);
        }

        setState(prev => ({
            ...prev,
            step: prev.step + 1
        }));
    };

    const previousStep = () => {
        // Clear any validation errors when moving back
        setValidationError(null);
        
        if (state.step > 1) {
            setState(prev => ({
                ...prev,
                step: prev.step - 1
            }));
        }
    };

    const restartQuote = () => {
        setState({
            step: 1,
            squareMeters: null,
            doors: null,
            windows: null,
            colorType: null,
            condition: null,
            existingColorType: null,
        });
        setQuote(null);
        setValidationError(null);
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Painting Job Estimator</h2>

            {state.step === 1 && (
                <SquareMetersQuestion
                    value={state.squareMeters || 0}
                    onChange={(value) => setState(prev => ({ ...prev, squareMeters: value }))}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    showPrevious={false}
                />
            )}

            {state.step === 2 && (
                <DoorsWindowsQuestion
                    doors={state.doors || 0}
                    windows={state.windows || 0}
                    onDoorsChange={(value) => setState(prev => ({ ...prev, doors: value }))}
                    onWindowsChange={(value) => setState(prev => ({ ...prev, windows: value }))}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    showPrevious={true}
                    validationError={validationError}
                />
            )}
            
            {state.step === 3 && (
                <ExistingColorQuestion
                    value={state.existingColorType}
                    onChange={(value) => setState(prev => ({ ...prev, existingColorType: value }))}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    showPrevious={true}
                />
            )}

            {state.step === 4 && (
                <ColorTypeQuestion
                    value={state.colorType}
                    onChange={(value) => setState(prev => ({ ...prev, colorType: value }))}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    showPrevious={true}
                />
            )}

            {state.step === 5 && (
                <ConditionQuestion
                    value={state.condition}
                    onChange={(value) => setState(prev => ({ ...prev, condition: value }))}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    showPrevious={true}
                />
            )}

            {state.step === 6 && quote !== null && (
                <QuoteResult
                    quote={quote}
                    onRestart={restartQuote}
                />
            )}

            <div className="mt-4 text-center text-sm text-gray-500">
                Step {state.step} of {state.step >= 6 ? 6 : 5}
            </div>
        </div>
    );
}
