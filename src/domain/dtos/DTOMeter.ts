export interface DTOMeter {
  meterId: number;
  reading: number;
  meterNr: string;
  type: MeterType;
  costPerUnit: number;
}

export type MeterType =
  | "STROMINPUT"
  | "STROMOUTPUT"
  | "STROMEIGENVERBRAUCH"
  | "GAS"
  | "WASSERWARM"
  | "WASSERKALT";
