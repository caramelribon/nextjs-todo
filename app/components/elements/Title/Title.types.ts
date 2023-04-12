import { HTag } from "../../../types/HTag.types";

export type TitleProps = JSX.IntrinsicElements["h1"] & {
  tag: HTag;
  title: string;
};
