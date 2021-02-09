// To parse this data:
//
//   import { Convert, Talonario } from "./file";
//
//   const talonario = Convert.toTalonario(json);

export interface Talonario {
  ok:   boolean;
  data: Datum[];
}

export interface Datum {
  talonario:  Array<TalonarioElement>;
  usuario_id: string;
  code: string;
  url: string;
  uid: string;
}

export interface TalonarioElement {
  numero?: number | string;
  salio:   number | string;
  mumero?: string;
  color?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTalonario(json: string): Talonario {
      return JSON.parse(json);
  }

  public static talonarioToJson(value: Talonario): string {
      return JSON.stringify(value);
  }
}

export class NewTalonario {
  usuario_id: String;
  url: String;
  code: String;
  talonario: Array<TalonarioElement>;
}

