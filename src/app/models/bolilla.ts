// To parse this data:
//
//   import { Convert, Bolilla } from "./file";
//
//   const bolilla = Convert.toBolilla(json);

export interface Bolilla {
  ok:       boolean;
  bolillas: BolillaElement[];
}

export interface BolillaElement {
  numero: number;
  uid:    string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toBolilla(json: string): Bolilla {
      return JSON.parse(json);
  }

  public static bolillaToJson(value: Bolilla): string {
      return JSON.stringify(value);
  }
}
