import { PaintingEstimatorConfig } from '../components/PaintingEstimator/types';

// Default configuration for pricing
export const defaultPricingConfig: PaintingEstimatorConfig = {
  pricePerSquareMeter: 20, // €20 per square meter
  pricePerDoor: 40, // €40 per door
  pricePerWindow: 30, // €30 per window
  darkColorMultiplier: 1.2, // 20% more for dark colors
  conditionMultipliers: {
    bad: 1.5, // 50% more for bad condition
    medium: 1.2, // 20% more for medium condition
    good: 1.0 // No additional cost for good condition
  }
};

export function calculatePaintingQuote(
  squareMeters: number,
  doors: number,
  windows: number,
  colorType: 'light' | 'dark',
  condition: 'bad' | 'medium' | 'good',
  config: PaintingEstimatorConfig = defaultPricingConfig
): number {
  // Base calculation for square meters
  let total = squareMeters * config.pricePerSquareMeter;
  
  // Add cost for doors and windows
  total += doors * config.pricePerDoor;
  total += windows * config.pricePerWindow;
  
  // Apply color multiplier if dark
  if (colorType === 'dark') {
    total *= config.darkColorMultiplier;
  }
  
  // Apply condition multiplier
  total *= config.conditionMultipliers[condition];
  
  return total;
}
