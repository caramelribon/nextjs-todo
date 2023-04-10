// Checkboxの型定義
export type CheckBoxProps = JSX.IntrinsicElements["input"] & {
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

