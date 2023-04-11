export type FormProps = Omit<JSX.IntrinsicElements["input"], "Change"> & {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
