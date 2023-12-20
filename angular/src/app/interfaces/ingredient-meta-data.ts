// deprecated
export interface IngredientMetaData {
  verbose_names: VerboseNames;
  // blank_fields: BlankFields;
  // max_length: MaxLength;
  choices: Choices;
}

export interface VerboseNames {
  [key: string]: string;
  name: string;
  brand: string;
  unit: string;
  kcal: string;
  carbs: string;
  protein: string;
  fat: string;
}

export interface UnitChoices {
  [key: string]: string;
}

// export interface BlankFields {
//   name: boolean;
//   brand: boolean;
//   unit: boolean;
//   kcal: boolean;
//   carbs: boolean;
//   protein: boolean;
//   fat: boolean;
// }

// export interface MaxLength {
//   name: number;
//   brand: number;
//   unit: number;
// }

export interface Choices {
  unit: Choice[];
}

export interface Choice {
  value: string;
  label: string;
}
