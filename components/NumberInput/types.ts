export interface NumberInputProps {
  singular: string;
  plural: string;
  iconAffix: string;
  onUpdate: (count: number) => void;
}
