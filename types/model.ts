export interface ProductProps {
  id: string;
  name: string;
  value: number;
  type: string;
  image: string;
}

export interface FormData {
  [key: string]: number | string;
}
