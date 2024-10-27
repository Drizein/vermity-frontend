export interface DTOAdditionalCost {
  id: number;
  name: string;
  description: string;
  amount: number;
  distribution: DistributionType;
  frequency: FrequencyType;
}

export type DistributionType = "SQUARE_METERS" | "FLAT" | "PERSON" | "NONE";
export type FrequencyType = "MONTHLY" | "QUARTERLY" | "YEARLY";
