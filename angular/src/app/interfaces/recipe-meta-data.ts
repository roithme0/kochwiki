export interface RecipeMetaData {
  verbose_names: VerboseNames;
  blank_fields: BlankFields;
  max_length: MaxLength;
}

export interface VerboseNames {
  name: string;
  servings: string;
  preptime: string;
  origin_name: string;
  origin_url: string;
  original: string;
  image: string;
}

export interface BlankFields {
  name: boolean;
  servings: boolean;
  preptime: boolean;
  origin_name: boolean;
  origin_url: boolean;
  original: boolean;
  image: boolean;
}

export interface MaxLength {
  name: number;
  origin_name: number;
  origin_url: number;
}
