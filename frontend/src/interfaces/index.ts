export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface Character {
  id: number;
  name: string;
  image: string;
  description: string;
  transformations: Transformation[];
}
