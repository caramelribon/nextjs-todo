export type RadioButtonProps = JSX.IntrinsicElements["input"] & {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
