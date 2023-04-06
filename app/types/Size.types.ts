import { SIZE } from "../constants/size";

export type Size = typeof SIZE[keyof typeof SIZE];
