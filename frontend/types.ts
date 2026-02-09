
export interface ClassificationResult {
  classification: 'Bird' | 'Drone' | 'Unknown';
  confidence: number;
  analysis?: string;
}
