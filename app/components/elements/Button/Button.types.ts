// ボタンの型定義
import { Color } from "../../../types/Color.types";
import { Size } from "../../../types/Size.types";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  size?: Size;
  color?: Color;
};
