import { PaintingEstimatorConfig } from '../components/PaintingEstimator/types';

// Default configuration for pricing
export const defaultPricingConfig: PaintingEstimatorConfig = {
  pricePerSquareMeter: 15, // €15 per square meter (lowered from 20)
  pricePerDoor: 25, // €25 per door (lowered from 40)
  pricePerWindow: 20, // €20 per window (lowered from 30)
  darkColorMultiplier: 1.2, // 20% more for dark colors
  conditionMultipliers: {
    bad: 1.5, // 50% more for bad condition
    medium: 1.2, // 20% more for medium condition
    good: 1.0 // No additional cost for good condition
  },
  existingColorFactor: {
    light: 1.0, // No additional cost for light existing paint
    dark: 1.15 // 15% more if existing paint is dark (requires more coats)
  }
};

export function calculatePaintingQuote(
  squareMeters: number,
  doors: number,
  windows: number,
  colorType: 'light' | 'dark',
  condition: 'bad' | 'medium' | 'good',
  existingColorType: 'light' | 'dark',
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

  // Apply existing color factor
  total *= config.existingColorFactor[existingColorType];
  
  return total;
}
