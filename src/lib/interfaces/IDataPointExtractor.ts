export type DataPoint = {
  x: number;
  y: number;
  value: number;
};

export type DataPointWithMetadata = DataPoint & {
  id: string;
  region: string;
  type: string;
};

export type DataPointGroup = Record<string, DataPointWithMetadata[]>;

export interface IDataPointExtractor {
  extract: (data: string) => [boolean, string];
  getKeys: () => string[];
  getDataFromKey: (key: string) => DataPointWithMetadata[];
  getFirstItem: () => DataPointWithMetadata[];
}
