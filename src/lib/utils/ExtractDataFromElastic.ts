import type {
  DataPoint,
  DataPointGroup,
  DataPointWithMetadata,
  IDataPointExtractor,
} from "../interfaces/IDataPointExtractor";

export class ExtractDataFromElastic implements IDataPointExtractor {
  private formattedData: DataPointGroup = {};
  private groupKeys: string[] = [];
  constructor() {}
  extract(data: string): [boolean, string] {
    try {
      this.formattedData = this.groupLines(JSON.parse(data));
      this.groupKeys = Object.keys(this.formattedData);
      return [true, ""];
    } catch (error) {
      console.log(`Error: `);
      console.log(error);

      return [false, JSON.stringify(error)];
    }
  }
  public getKeys(): string[] {
    return this.groupKeys;
  }
  public getDataFromKey(key: string): DataPointWithMetadata[] {
    if (key) {
      return this.formattedData[key];
    }
    return this.getFirstItem();
  }

  public getFirstItem(): DataPointWithMetadata[] {
    return this.formattedData[this.groupKeys[0]];
  }

  groupLines(data: any): DataPointGroup {
    const allHits = data.hits.hits;
    return allHits.reduce((groups: DataPointGroup, hit: any) => {
      const valuesInHit = hit.fields["deepstream-msg"];
      const valuesParsed = this.extractPropertiesFromLines(valuesInHit);

      for (const value of valuesParsed) {
        const { type } = value;
        const doesNotContain = !groups[type];
        if (doesNotContain) groups[type] = [];

        groups[type].push(value);
      }

      return groups;
    }, {});
  }
  extractPropertiesFromLines(lines: string[]): DataPointWithMetadata[] {
    return lines.map(this.extractPropertiesFromLine.bind(this));
  }

  extractPropertiesFromLine(line: string): DataPointWithMetadata {
    const [id, xMin, yMin, xMax, yMax, type, region] = line.split("|");
    return {
      id,
      ...this.calculateCentroid(
        Number(xMin),
        Number(yMin),
        Number(xMax),
        Number(yMax),
      ),
      type,
      region,
    };
  }

  calculateCentroid(
    xMin: number,
    yMin: number,
    xMax: number,
    yMax: number,
  ): any {
    const xCenter = Math.round(xMin + (xMax - xMin) / 2);
    const yCenter = Math.round(yMin + (yMax - yMin) / 2);
    return {
      x: xCenter,
      y: yCenter,
    };
  }
}
