export interface PaintingEstimatorConfig {
  pricePerSquareMeter: number;
  pricePerDoor: number;
  pricePerWindow: number;
  darkColorMultiplier: number;
  conditionMultipliers: {
    bad: number;
    medium: number;
    good: number;
  };
}

export interface EstimatorState {
  step: number;
  squareMeters: number;
  doors: number;
  windows: number;
  colorType: 'light' | 'dark' | null;
  condition: 'bad' | 'medium' | 'good' | null;
}
