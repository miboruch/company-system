export interface Field {
  name: string;
  type: string;
  required: boolean;
  label: string;
  disabled?: boolean;
  spacing?: boolean;
  onFieldError?: () => void;
  onFieldChange?: () => void;
}
