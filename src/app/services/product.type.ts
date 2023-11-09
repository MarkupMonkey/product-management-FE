import { FormControl } from "@angular/forms";

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  photos: string[];
  category: string;
}

export type ProductForm = {
  id: FormControl<number | undefined | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormControl<string | null>;
  photos: FormControl<string[] | null>;
  category: FormControl<string | null | undefined>;
}
