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
  existingColorFactor: {
    light: number;
    dark: number;
  };
}

export interface EstimatorState {
  step: number;
  squareMeters: number | null;
  doors: number | null;
  windows: number | null;
  colorType: 'light' | 'dark' | null;
  condition: 'bad' | 'medium' | 'good' | null;
  existingColorType: 'light' | 'dark' | null;
}
